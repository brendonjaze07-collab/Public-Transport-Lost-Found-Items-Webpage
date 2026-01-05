'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitClaimRequest(prevState: any, formData: FormData) {
    try {
        const itemId = formData.get('itemId') as string;
        const description = formData.get('description') as string; // User's explanation of why it's theirs
        const dateLostStr = formData.get('dateLost') as string;

        // TODO: uploading proof images (simplified for now to just description or we can add file upload later if requested)

        // Constraint Hack: We need a User ID for 'claimantId'.
        // In a real app, we would get `session.user.id`.
        // For this prototype/demo without public signup, we'll assign it to the first Admin/User we find or a dummy user.
        const placeholderUser = await prisma.user.findFirst();

        if (!placeholderUser) {
            return { error: 'System error: No users available to process claim.' };
        }

        // Check if claim already exists
        const existingClaim = await prisma.claimRequest.findUnique({
            where: { itemId }
        });

        if (existingClaim) {
            return { error: 'A claim request for this item is already pending.' };
        }

        await prisma.$transaction(async (tx) => {
            await tx.claimRequest.create({
                data: {
                    description: description, // We might want to prepend "Claimant Name: XYZ" if we added that field to the form
                    dateLost: new Date(dateLostStr),
                    status: 'PENDING',
                    itemId: itemId,
                    claimantId: placeholderUser.id,
                },
            });

            await tx.foundItem.update({
                where: { id: itemId },
                data: { status: 'PENDING' }
            });
        });

        revalidatePath('/dashboard');
        revalidatePath('/search');
        revalidatePath(`/claim/${itemId}`);

    } catch (error) {
        console.error('Failed to submit claim:', error);
        return { error: 'Failed to submit claim. Please try again.' };
    }

    redirect('/claim/success');
}
