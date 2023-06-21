import Carousel from "@/components/Carousel/CarouselItem";
import CategoriesMap from "@/components/Categories/CategoriesMap";
import Product from "@/models/productModel";
import db from "@/utils/db";

export default function Home({ products }) {
	return (
		<div className="flex flex-col">
			<Carousel products={products} />
			<CategoriesMap products={products} />
		</div>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return { props: { products: products.map(db.convertDocToObj) } };
}
