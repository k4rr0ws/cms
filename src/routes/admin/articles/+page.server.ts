import type { Actions, PageServerLoad } from "./$types"
import { fail } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async () => {
    return {
        articles: await prisma.article.findMany({
            include: { user: true }
        })
    }
};