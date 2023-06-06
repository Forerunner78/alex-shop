import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import db from "@/utils/db";
import Product from "@/models/productModel";
import Rating from "@/components/Rating";

const ProductScreen = (props) => {
	const { product } = props;

	if (!product) {
		return <div>Product not found!</div>;
	}
	return (
		<div className="m-2">
			<div>
				<Link href="/" className="underline">
					&lt; Back to Home
				</Link>
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
				<div className="mt-10 mb-10 uppercase font-bold text-center text-sm">
					<h1 className="text-xl">{product.name}</h1>
					<Rating value={product.rating} numReview={product.numReviews} />
				</div>
				<div className="font-bold text-center text-xl">{product.price} €</div>
				<div className="text-justify mb-10">{product.shortDescription}</div>

				<div>
					<AddToCartButton
						product={product}
						className={
							"w-full h-24 bg-black text-white text-2xl uppercase rounded-full"
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
