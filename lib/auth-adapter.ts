import { Pool } from "pg";
import type { Adapter } from "next-auth/adapters";

export function PgAdapter(client: Pool): Adapter {
	return {
		async createUser(user) {
			const result = await client.query(
				`INSERT INTO users (name, email, email_verified, image) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, email, email_verified as "emailVerified", image`,
				[
					user.name,
					user.email,
					user.emailVerified?.toISOString() || null,
					user.image,
				]
			);
			return result.rows[0];
		},

		async getUser(id) {
			const result = await client.query(
				`SELECT id, name, email, email_verified as "emailVerified", image 
         FROM users WHERE id = $1`,
				[id]
			);
			return result.rows[0] || null;
		},

		async getUserByEmail(email) {
			const result = await client.query(
				`SELECT id, name, email, email_verified as "emailVerified", image 
         FROM users WHERE email = $1`,
				[email]
			);
			return result.rows[0] || null;
		},

		async getUserByAccount({ providerAccountId, provider }) {
			const result = await client.query(
				`SELECT u.id, u.name, u.email, u.email_verified as "emailVerified", u.image
         FROM users u
         JOIN accounts a ON u.id = a.user_id
         WHERE a.provider_account_id = $1 AND a.provider = $2`,
				[providerAccountId, provider]
			);
			return result.rows[0] || null;
		},

		async updateUser(user) {
			const result = await client.query(
				`UPDATE users
         SET name = $2, email = $3, email_verified = $4, image = $5
         WHERE id = $1
         RETURNING id, name, email, email_verified as "emailVerified", image`,
				[
					user.id,
					user.name,
					user.email,
					user.emailVerified?.toISOString() || null,
					user.image,
				]
			);
			return result.rows[0];
		},

		async deleteUser(userId) {
			await client.query("DELETE FROM users WHERE id = $1", [userId]);
			return null;
		},

		async linkAccount(account) {
			await client.query(
				`INSERT INTO accounts (
          user_id, provider, provider_account_id, type, provider_token_type,
          access_token, refresh_token, expires_at, token_type, scope, id_token, session_state
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
				[
					account.userId,
					account.provider,
					account.providerAccountId,
					account.type,
					account.token_type || null,
					account.access_token || null,
					account.refresh_token || null,
					account.expires_at || null,
					account.token_type || null,
					account.scope || null,
					account.id_token || null,
					account.session_state || null,
				]
			);
			return account;
		},

		async unlinkAccount({ providerAccountId, provider }) {
			await client.query(
				"DELETE FROM accounts WHERE provider_account_id = $1 AND provider = $2",
				[providerAccountId, provider]
			);
		},

		async createSession({ sessionToken, userId, expires }) {
			await client.query(
				`INSERT INTO sessions (session_token, user_id, expires)
         VALUES ($1, $2, $3)`,
				[sessionToken, userId, expires.toISOString()]
			);
			return { sessionToken, userId, expires };
		},

		async getSessionAndUser(sessionToken) {
			const result = await client.query(
				`SELECT s.session_token as "sessionToken", s.user_id as "userId", s.expires,
                u.id, u.name, u.email, u.email_verified as "emailVerified", u.image
         FROM sessions s
         JOIN users u ON s.user_id = u.id
         WHERE s.session_token = $1 AND s.expires > NOW()`,
				[sessionToken]
			);

			if (result.rows.length === 0) return null;

			const { sessionToken: token, userId, expires, ...user } = result.rows[0];
			return {
				session: { sessionToken: token, userId, expires: new Date(expires) },
				user,
			};
		},

		async updateSession({ sessionToken, expires, userId }) {
			const result = await client.query(
				`UPDATE sessions
         SET expires = $2, user_id = $3
         WHERE session_token = $1
         RETURNING session_token as "sessionToken", user_id as "userId", expires`,
				[sessionToken, expires?.toISOString(), userId]
			);
			return result.rows[0] || null;
		},

		async deleteSession(sessionToken) {
			await client.query("DELETE FROM sessions WHERE session_token = $1", [
				sessionToken,
			]);
		},

		async createVerificationToken({ identifier, expires, token }) {
			await client.query(
				`INSERT INTO verification_tokens (identifier, token, expires)
         VALUES ($1, $2, $3)`,
				[identifier, token, expires.toISOString()]
			);
			return { identifier, token, expires };
		},

		async useVerificationToken({ identifier, token }) {
			const result = await client.query(
				`DELETE FROM verification_tokens
         WHERE identifier = $1 AND token = $2
         RETURNING identifier, token, expires`,
				[identifier, token]
			);
			if (result.rows.length === 0) return null;

			const { expires, ...rest } = result.rows[0];
			return { ...rest, expires: new Date(expires) };
		},
	};
}
