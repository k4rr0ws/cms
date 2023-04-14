import type { Actions, PageServerLoad } from "./$types"
import { fail } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ params }) => {

    const limit: number = 3
    const page: number = Number(params.page)

    const getPage = async(page: number, limit: number) => {
        try {
            const articles = await prisma.article.findMany({
                where: {
                    published: false
                },
                skip: (page - 1) * limit,
                take: limit,
                include: { user: true }
            })
            return articles;
        } catch (error) {
            console.error(error)
            return fail(400, { message: 'Could not load articles' })
        }
    }

    const paginationData = async(page: number, limit: number) => {
        try {
            const count = await prisma.article.count({
                where: {
                    published: false
                }
            })
            let pages: number = Math.ceil(count / limit)

            return {
                count,
                pages,
                limit,
                page
            }
        } catch (error) {
            console.error(error)
            return fail(400, { message: 'Failed to load pagination data' })
        }
    }

    return {
        articles: getPage(page, limit),
        paginationData: paginationData(page, limit)
    }
};