import type { Actions, PageServerLoad } from "./$types"
import { redirect, fail } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { z } from "zod"
import { validateData } from "$lib/utils"
import { prisma } from "$lib/server/prisma"

const articleSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(1, { message: 'Title must be at least 1 character long' })
        .max(64, { message: 'Title cannot be more than 64 characters long' })
        .trim(),
    description: z
        .string()
        .min(1, { message: 'Description must be at least 1 characters long' })
        .max(256, { message: 'Description cannot be more than 256 characters long' })
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
        .trim(),
    published: z.boolean().or(z.string()).transform((value) => {
        if (value === 'on') {
          return true
        }
        return false;
    }).optional()
});


export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth.validate()

    if (!session) {
        throw redirect(302, '/')
    }
    
    
    return {
        article: await prisma.article.findUnique({
            where: {
                id: Number(params.articleId)
            },
            include: { user: true, category: true },
        }),
        categories: await prisma.category.findMany()
    }
    


};

export const actions: Actions = {
    updateArticle: async ({ request, params }) => {

        const { formData, errors } = await validateData(await request.formData(), articleSchema);
        console.log(formData)
        
        if (errors) {
            console.log(errors)
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        const { title, description, url, categoryId, published } = formData

        try {
            await prisma.article.update({
                where: {
                    id: Number(params.articleId)
                },
                data: {
                    title,
                    description,
                    url,
                    category: { connect: { id: Number(categoryId) }},
                    published: Boolean(published)
                }
            })
        } catch (error) {
            return fail(500, {
                message: 'There was an error updating the article'
            })
        }

        throw redirect(302, '/admin/articles')
    },
    deleteArticle: async({ request, params }) => {
        try {
            await prisma.article.delete({
                where: {
                    id: Number(params.articleId)
                }
            })
        } catch (error) {
            throw fail(500, { message: 'Couldnt delete that article'} )
        }

        throw redirect(302, '/admin/articles')
    }
}