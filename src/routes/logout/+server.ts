import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { SESSION_COOKIE_NAME } from "lucia-auth";

export const POST: RequestHandler = async ({ cookies, locals }) => {
    
    const sessionId = cookies.get(SESSION_COOKIE_NAME) as string;

    if (!sessionId) {
        throw redirect(302, '/')
    }

    await auth.invalidateSession(sessionId)
    locals.auth.setSession(null)
    
    throw redirect(302, '/')
}