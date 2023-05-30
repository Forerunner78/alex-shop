import Order from "@/models/orderModel";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
	await db.connect();
	const newOrder = new Order({ ...req.body });

	const order = await newOrder.save();
	res.status(201).send(order);
};

export default handler;
