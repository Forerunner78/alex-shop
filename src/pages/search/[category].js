import ProductItem from "@/components/ProductItem";
import Product from "@/models/productModel";
import db from "@/utils/db";

const SearchScreen = (props) => {
	const { products } = props;

	return (
		<div className="flex justify-center">
			<div className="mt-[20vh]">
				<div className="mt-0 mx-10 bg-slate-200 pt-10">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{products.map((product) => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchScreen;

export async function getServerSideProps(context) {
	await db.connect();
	const { params } = context;
	const { category } = params;
	var products;

	if (category === "all" || !category) {
		products = await Product.find().lean();
	} else {
		products = await Product.find({ category }).lean();
	}
	await db.disconnect();
	return { props: { products: products.map(db.convertDocToObj) } };
}
