import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import db from "@/utils/db";
import Product from "@/models/productModel";
import Rating from "@/components/Rating";

const ProductScreen = (props) => {
	const { product } = props;

	if (!product) {
		return (
			<div className="flex flex-col text-center">
				<span className="text-lg">Product not found!</span>{" "}
				<Link className="underline m-5" href="/">
					Go back to Home
				</Link>
			</div>
		);
	}
	return (
		<div className="m-2">
			<div className="mb-5 underline">
				<Link href="/">&lt; Back to Home</Link>
			</div>

			<div>
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={500}
					priority={true}
				/>
			</div>
			<div>
				<div className="my-10 uppercase font-bold text-center text-sm">
					<h1 className="text-xl">{product.name}</h1>
					<Rating value={product.rating} numReview={product.numReviews} />
				</div>
				<div className="font-bold text-center text-xl mb-5">{product.price} €</div>
				<div className="text-justify indent-10 mb-10">{product.shortDescription}</div>

				<div>
					<AddToCartButton
						product={product}
						className={
							"w-full h-10 bg-black text-white text-2xl uppercase rounded-full"
						}
					/>
				</div>
			</div>
		</div>
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
