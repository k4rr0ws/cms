import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import { auth } from "$lib/server/lucia"
import { z } from "zod"
import { validateData } from "$lib/utils"

const articleSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(1, { message: 'Title must be at least 1 character long' })
        .max(64, { message: 'Title cannot be more than 64 characters long' })
        .trim(),
    description: z
        .string()
        .min(1, { message: 'Description must be at least 1 characters long' })
        .max(64, { message: 'Description cannot be more than 256 characters long' })
        .trim(),
    categoryId: z.number().or(z.string()).transform((value) => {
        if (typeof value === 'string') {
          return parseFloat(value);
        }
        return value;
    }),
    url: z
        .string()
        .min(1, { message: 'Excerpt must be at least 1 characters long' })
        .max(256, { message: 'Excerpt cannot be more than 256 characters long' })
        .trim()
});

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) {
        throw redirect(302, '/login')
    }

    const user = await auth.getUser(session.userId)

    return {
        categories: await prisma.category.findMany()
    }
};

export const actions: Actions = {
    default: async ({ request, locals }) => {

        const session = await locals.auth.validate()
        if (!session) {
            throw redirect(302, '/login')
        }

        const { userId } = await auth.getUser(session.userId)

        const { formData, errors } = await validateData(await request.formData(), articleSchema);
        
        if (errors) {
            console.log(errors)
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        const { title, description, url, categoryId } = formData
        try {
            await prisma.article.create({
                data: {
                    title,
                    description,
                    url,
                    createdAt: new Date(),
                    user: { connect: { id: userId } },
                    category: { connect: { id: categoryId } }
                }
            })

        } catch (err) {
            console.log(err)
            return fail(500, { 
                message: 'Could not create the article.' 
            })
        }

        return {
            status: 201
        }
        
    }
};