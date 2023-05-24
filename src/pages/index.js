import ProductItem from "@/components/ProductItem";
import data from "@/utils/data";

export default function Home() {
	return (
		<>
			{data.products.map((product) => (
				<ProductItem product={product} key={product.id} />
			))}
		</>
	);
}
