import User from "@/models/userModel";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
	if (req.method !== "PUT") {
		return res.status(400).send({ message: `${req.method} not supported` });
	}

	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send("SignIn required");
	}

	const { name, email, password } = req.body;

	if (!name || !email || !email.includes("@") || (password && password.trim().length < 8)) {
		res.status(422).json({ message: "Validation error" });
		return;
	}

	await db.connect();
	const userToUpdate = await User.findById(user._id);
	userToUpdate.name = name;
	userToUpdate.email = email;
	if (password) {
		userToUpdate.password = bcryptjs.hashSync(password);
	}
	await userToUpdate.save();
	await db.disconnect();
	res.send({ message: "User updated" });
};

export default handler;
