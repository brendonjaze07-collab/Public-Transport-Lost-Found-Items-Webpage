'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { redirect } from 'next/navigation';
import { existsSync } from 'fs';

export async function reportFoundItem(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const dateFoundStr = formData.get('dateFound') as string;
        const timeFoundStr = formData.get('timeFound') as string;
        const location = formData.get('location') as string;
        const transportType = formData.get('transportType') as string;
        const routeNumber = formData.get('routeNumber') as string || null;
        const imageFile = formData.get('image') as File;

        let imageUrl = null;

        if (imageFile && typeof imageFile === 'object' && 'size' in imageFile && imageFile.size > 0) {
            try {
                const bytes = await imageFile.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const uploadDir = join(process.cwd(), 'public', 'uploads');

                // Ensure directory exists
                if (!existsSync(uploadDir)) {
                    await mkdir(uploadDir, { recursive: true });
                }

                const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
                const path = join(uploadDir, filename);

                await writeFile(path, buffer);
                imageUrl = `/uploads/${filename}`;
                console.log('Image saved successfully:', imageUrl);
            } catch (err) {
                console.error('Error saving image:', err);
                // Continue without image if it fails, or throw? 
                // For now, let's keep going but log it.
            }
        } else {
            console.log('No valid image file found in request');
        }

        // Combine date and time
        const dateFound = new Date(`${dateFoundStr}T${timeFoundStr}`);

        // Create the item
        // Note: We need a User ID for 'recordedBy'. 
        // For this public form, we might create a generic 'SYSTEM' or 'PUBLIC' user, 
        // or if this form is for staff, we need auth.
        // The requirement says "Name of staff who recorded the item". 
        // For now, let's fetch the Admin or first user to link it to, OR make recordedBy optional in schema?
        // Schema said: recordedBy User @relation...
        // Let's find the first user (Admin) to attribute it to for now, or create a 'Guest Reporter'.

        let reporter = await prisma.user.findFirst({
            where: { role: 'ADMIN' } // Fallback to admin for now
        });

        if (!reporter) {
            throw new Error('No staff user found to link report to.');
        }

        await prisma.foundItem.create({
            data: {
                name,
                category,
                description,
                imageUrl,
                dateFound,
                locationFound: location,
                transportType,
                routeNumber,
                status: 'FOUND',
                recordedById: reporter.id,
            },
        });

        revalidatePath('/dashboard');
        revalidatePath('/search');

    } catch (error) {
        console.error('Failed to report item:', error);
        return { error: 'Failed to report item. Please try again.' };
    }

    redirect('/report/success');
}
