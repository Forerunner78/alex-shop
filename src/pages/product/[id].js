import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import db from "@/utils/db";
import Product from "@/models/productModel";

const ProductScreen = (props) => {
	const { product } = props;

	if (!product) {
		return <div>Product not found!</div>;
	}
	return (
		<>
			<Link href="/">Back to Home</Link>
			<div>
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={500}
					priority={true}
				/>
			</div>
			<ul>
				<li>
					<h1>{product.name}</h1>
				</li>
				<li>Category: {product.category}</li>
				<li>
					{product.rating} of {product.numReviews} reviews{" "}
				</li>
				<li>Description {product.description}</li>
			</ul>
			<div>
				<div>
					<div>Price:</div>
					<div>
						<strong>{product && product.price} €</strong>
					</div>
					<div>
						<div>Status:</div>
						<div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
					</div>
					<AddToCartButton product={product} />
				</div>
			</div>
		</>
	);
};

export default ProductScreen;

export async function getServerSideProps(context) {
	const { params } = context;
	const { id } = params;

	await db.connect();
	const product = await Product.findOne({ id }).lean();
	await db.disconnect();
	return { props: { product: product ? db.convertDocToObj(product) : null } };
}
