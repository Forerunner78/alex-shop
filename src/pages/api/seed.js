import db from "@/utils/db";
import User from "@/models/userModel";
import data from "@/utils/data";
import Product from "@/models/productModel";

const handler = async (req, res) => {
	await db.connect();
	await User.deleteMany();
	await User.insertMany(data.users);
	await Product.deleteMany();
	await Product.insertMany(data.products);
	await db.disconnect();
	res.send({ message: "Data successfully sent" });
};

export default handler;
