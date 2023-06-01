import { getToken } from "next-auth/jwt";

const { default: Order } = require("@/models/orderModel");
const { default: db } = require("@/utils/db");

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send("SignIn required");
	}
	await db.connect();
	const order = await Order.findById(req.query.id);
	await db.disconnect();
	res.send(order);
};

export default handler;
