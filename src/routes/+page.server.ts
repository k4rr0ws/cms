import type { Actions, PageServerLoad } from "./$types"
import { fail } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async () => {
    return {
        articles: await prisma.article.findMany({
            where: {
                published: true
            },
            include: { user: true },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
};

export const actions: Actions = {
    deleteArticle: async ({ url }) => {
        const id = url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: 'Invalid parameter'})
        }

        try {
            await prisma.article.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Something went wrong deleting your article' })
        }

        return {
            status: 200
        }
    }
};