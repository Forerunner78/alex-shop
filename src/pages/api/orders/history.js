import Order from "@/models/orderModel";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send("SignIn required");
	}
	await db.connect();
	const orders = await Order.find({ user: user._id });
	await db.disconnect();
	res.send(orders);
};

export default handler;
