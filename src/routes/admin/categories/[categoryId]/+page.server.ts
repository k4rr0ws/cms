import type { Actions, PageServerLoad } from "./$types"
import { redirect, fail } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { z } from "zod"
import { validateData } from "$lib/utils"
import { prisma } from "$lib/server/prisma"

const editCategorySchema = z.object({
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

export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth.validate()

    if (!session) {
        throw redirect(302, '/')
    }
    
    
    return {
        category: await prisma.category.findUnique({
            where: {
                id: Number(params.categoryId)
            }
        })
    }
    


};

export const actions: Actions = {
    default: async({ request, params }) => {

        const { formData, errors } = await validateData(await request.formData(), editCategorySchema);

        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        const { slug, name } = formData;

        try {
            await prisma.category.update({
                where: {
                    id: Number(params.categoryId)
                },
                data: {
                    slug,
                    name
                }
            })
        } catch (err) {
            return fail(500, { 
                message: 'There was an error updating category' 
            })
        }

        throw redirect(302, '/admin/categories')
    }
}