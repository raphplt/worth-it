import NextAuth from "next-auth";
import { sql } from "@vercel/postgres";
import { PgAdapter } from "@auth/pg-adapter";
import { authOptions as baseAuthOptions } from "@/lib/auth";

export const authOptionsWithAdapter = {
	...baseAuthOptions,
	adapter: PgAdapter(sql),
};

const handler = NextAuth(authOptionsWithAdapter);

export { handler as GET, handler as POST };
