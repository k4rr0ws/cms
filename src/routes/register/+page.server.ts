import { redirect, fail } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { auth } from '$lib/server/lucia'
import { z } from "zod";
import { validateData } from "$lib/utils"

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.auth.validate()
    if (session) {
        throw redirect(302, '/login')
    }
};

const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(1, { message: 'Username must be at least 1 character long' })
        .max(64, { message: 'Username cannot be more than 64 characters long' })
        .trim(),
    password: z.string({ required_error: 'Username is required' })
        .min(1, { message: 'Password must be at least 8 characters long' })
        .max(128, { message: 'Password cannot be more than 128 characters long' })
        .trim()
});

export const actions: Actions = {
    default: async({ request }) => {

        const { formData, errors } = await validateData(await request.formData(), registerSchema);

        if (errors) {
            delete formData.password

            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            })
        }

        const { username, password } = formData;

        try {
            await auth.createUser({
                primaryKey: {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes: {
                    username
                }
            })
        } catch (err) {
            return fail(400, { message: 'Could not register a new user' })
        }
        throw redirect(302, '/login')
    }
};