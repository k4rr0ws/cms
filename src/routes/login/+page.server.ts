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
    if (session) {
        throw redirect(302, '/')
    }
};

export const actions: Actions = {
    default: async( {request, locals } ) => {
        const { formData, errors } = await validateData(await request.formData(), loginSchema);
        
        if (errors) {
            delete formData.password

            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        try {
            const key = await auth.useKey("username", formData.username, formData.password)
            const session = await auth.createSession(key.userId)
            locals.auth.setSession(session)
            console.log(session)
        } catch (err) {
            console.error(err)
            return fail(401, {
                error: true,
                message: 'Invalid username or password.' 
            })
        }

        throw redirect(302, '/')
        
    }
};