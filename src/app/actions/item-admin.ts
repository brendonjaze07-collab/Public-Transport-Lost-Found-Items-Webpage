'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateItemStatus(itemId: string, newStatus: string) {
    try {
        // Use a transaction so both the FoundItem and related ClaimRequest(s)
        // are updated atomically.
        await prisma.$transaction(async (tx) => {
            await tx.foundItem.update({
                where: { id: itemId },
                data: { status: newStatus },
            });

            // If item is marked as CLAIMED, approve any pending claim(s) for it.
            if (newStatus === 'CLAIMED') {
                await tx.claimRequest.updateMany({
                    where: { itemId: itemId, status: 'PENDING' },
                    data: { status: 'APPROVED' },
                });
            } else {
                // For other status transitions (e.g., reverting to FOUND or DISPOSED),
                // reject any pending claims to keep counts accurate.
                await tx.claimRequest.updateMany({
                    where: { itemId: itemId, status: 'PENDING' },
                    data: { status: 'REJECTED' },
                });
            }
        });

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/items');
        revalidatePath('/search');
    } catch (error) {
        console.error('Failed to update status:', error);
        throw error;
    }
}

export async function deleteItem(itemId: string) {
    try {
        // Delete associated claim request first to avoid foreign key constraint errors
        await prisma.claimRequest.deleteMany({
            where: { itemId: itemId }
        });

        await prisma.foundItem.delete({
            where: { id: itemId }
        });

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/items');
        revalidatePath('/search');
    } catch (error) {
        console.error('Failed to delete item:', error);
        throw error; // Re-throw so Next.js handles it or UI can show error if using useFormState
    }
}
