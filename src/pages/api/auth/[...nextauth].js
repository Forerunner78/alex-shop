import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import db from "@/utils/db";
import NextAuth from "next-auth/next";

export default NextAuth({
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user?._id) {
				token._id = user._id;
			}
			if (user?.isAdmin) {
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?._id) {
				session._id = token._id;
			}
			if (token?.isAdmin) {
				session.isAdmin = token.isAdmin;
			}
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({ email: credentials.email });
				await db.disconnect();
				if (user && bcryptjs.compareSync(credentials.password, user.password)) {
					return {
						_id: user._id,
						name: user.name,
						image: "f",
						email: user.email,
						isAdmin: user.isAdmin,
					};
				}
				throw new Error("Invalid email or password");
			},
		}),
	],
});
