import Order from "@/models/orderModel";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send("Error: SignIn required");
	}

	await db.connect();
	const order = await Order.findById(req.query.id);
	if (order) {
		if (order.isPaid) {
			return res.status(400).send({ message: "Error: Order is already paid" });
		}
		order.isPaid = true;
		const currentDate = new Date();
		const formattedDate = `${currentDate.getFullYear()}/${
			currentDate.getMonth() + 1
		}/${currentDate.getDate()}`;
		const formattedTime = `${currentDate.getHours()}h${currentDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
		const formattedDateTime = `${formattedDate} at ${formattedTime}`;
		order.paidAt = formattedDateTime;
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			email_address: req.body.email_address,
		};
		const paidOrder = await order.save();
		await db.disconnect();
		res.send({ message: "Order paid successfully", order: paidOrder });
	} else {
		await db.disconnect();
		res.status(404).send({ message: "Error: Order not found" });
	}
};
export default handler;
