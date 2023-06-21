import AddToCartButton from "@/components/Buttons/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import db from "@/utils/db";
import Product from "@/models/productModel";
import Rating from "@/components/Rating";
import Layout from "@/components/Layout";

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
		<Layout className="mt-[15vh] mx-5 md:mx-10">
			<div className="mb-10 underline">
				<Link href="/">&lt; Back to Home</Link>
			</div>
			<div className="md:flex md:flex-row md:mb-10">
				<div className="flex justify-center md:w-[45vw] lg:h-[80vh]">
					<div className="w-[80vw] md:w-[90%] h-[50vh] md:h-[100%] lg:h-[90%] relative">
						<Image
							src={product.image}
							alt={product.name}
							className="object-contain absolute"
							fill
							priority={true}
						/>
					</div>
				</div>
				<div className="md:w-[45vw] mx-5">
					<div className="my-10 uppercase font-bold text-center text-sm">
						<h1 className="text-2xl lg:text-3xl">{product.name}</h1>
						<Rating value={product.rating} numReview={product.numReviews} />
					</div>
					<div className="font-bold text-center text-xl lg:text-2xl mb-5">
						{product.price} €
					</div>
					<div className="md:hidden text-justify indent-10 mb-10 px-5">
						{product.shortDescription}
					</div>
					<div className="hidden md:inline-block text-justify indent-10 mb-10 px-5">
						{product.longDescription}
					</div>

					<div className="flex justify-center">
						<AddToCartButton
							product={product}
							className={"w-[75%] h-10 mb-10 text-2xl"}
						/>
					</div>
				</div>
			</div>
		</Layout>
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
