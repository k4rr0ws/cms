import type { PrismaClient } from "@prisma/client"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	type Category  = {
		id: number;
		name: string;
		slug: string;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient
	
	declare namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type UserAttributes = {
			username: string,
			admin: boolean
		};
	}
	
	/// <reference types="@sveltejs/kit" />
	declare namespace App {
		interface Locals {
			auth: import("lucia-auth").AuthRequest;
		}
	}
}

export { };
