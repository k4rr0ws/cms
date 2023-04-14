import type { Actions, PageServerLoad } from "./$types"
import { redirect, fail } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { z } from "zod"
import { validateData } from "$lib/utils"
import { prisma } from "$lib/server/prisma"

const createCategorySchema = z.object({
    slug: z
        .string({ required_error: 'Slug is required' })
        .min(1, { message: 'Username must be at least 1 character long' })
        .max(64, { message: 'Username cannot be more than 64 characters long' })
        .trim(),
    name: z.string()
        .min(1, { message: 'Name must be at least 2 characters long' })
        .max(128, { message: 'Name cannot be more than 68 characters long' })
        .trim()
});

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()

    if (!session) {
        throw redirect(302, '/')
    }

    return {
        categories: await prisma.category.findMany()
    }

};

export const actions: Actions = {
    createCategory: async({ request }) => {

        const { formData, errors } = await validateData(await request.formData(), createCategorySchema);

        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        const { slug, name } = formData;

        try {
            await prisma.category.create({
                data: {
                    slug,
                    name
                }
            })
        } catch (err) {
            return fail(500, { 
                message: 'Could not create the new category' 
            })
        }

        throw redirect(302, '/admin/categories')
    },
    deleteCategory: async({ request }) => {

        const { categoryId } = Object.fromEntries(await request.formData())

        try {
            await prisma.category.delete({
                where: {
                    id: Number(categoryId)
                }
            })
        } catch (err) {
            return fail(500, { 
                message: 'There was an error deleting the category' 
            })
        }

        throw redirect(302, '/admin/categories')
    }
}