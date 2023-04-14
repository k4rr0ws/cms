import type { Actions, PageServerLoad } from "./$types"
import { redirect, fail } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { z } from "zod"
import { validateData } from "$lib/utils"

const loginSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(1, { message: 'Username must be at least 1 character long' })
        .max(64, { message: 'Username cannot be more than 64 characters long' })
        .trim(),
    password: z.string()
        .min(1, { message: 'Password must be at least 8 characters long' })
        .max(128, { message: 'Password cannot be more than 128 characters long' })
        .trim()
});

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) {
        throw redirect(302, '/')
    }
};

export const actions: Actions = {

}