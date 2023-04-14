import type { LayoutServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser()

    return {
        user,
        categories: await prisma.category.findMany()
    }
}