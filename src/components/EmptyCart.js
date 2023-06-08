import Link from "next/link";

export const EmptyCart = () => {
	return (
		<div className="flex flex-col text-center">
			<span className="text-lg">Sorry, your cart is empty!</span>{" "}
			<Link className="underline m-5" href="/">
				Go back to Home
			</Link>
		</div>
	);
};
