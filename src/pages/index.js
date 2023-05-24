import ProductItem from "@/components/ProductItem";
import products from "@/utils/data";

export default function Home() {
	return (
		<>
			{products.map((product) => (
				<ProductItem product={product} key={product.id} />
			))}
		</>
	);
}
