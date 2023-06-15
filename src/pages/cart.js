import { Store } from "@/utils/Store";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import { HiOutlineTrash } from "react-icons/hi2";
import { EmptyCart } from "@/components/EmptyCart";
import Layout from "@/components/Layout";

const CartScreen = () => {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	const {
		cart: { cartItems },
	} = state;

	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};

	const updateCartHandler = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			toast.error("Sorry. Product is out of stock");
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
		toast.success("Product updated to the cart");
	};

	return (
		<Layout>
			<h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Your Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<div className="flex flex-col">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
							<div className="overflow-hidden">
								<table className="min-w-full text-center text-sm font-light">
									<thead className="font-medium">
										<tr className="md:text-xl">
											<th scope="col" className="px-3 py-4">
												Item
											</th>
											<th scope="col" className="px-3 py-4">
												Quantity
											</th>
											<th scope="col" className="px-3 py-4">
												Price
											</th>
											<th scope="col" className="px-3 py-4">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item) => (
											<tr
												key={item._id}
												className="border-b-black border-t-black border-2 md:text-lg"
											>
												<td className="relative whitespace-nowrap px-3 py-4 my-5 font-medium flex justify-center h-[20vh] md:h-[30vh]">
													<Link href={`/product/${item.id}`} className="">
														<Image
															src={item.image}
															alt={item.name}
															fill
															className="object-contain"
														/>
													</Link>
												</td>
												<td className="whitespace-nowrap px-3 py-4">
													<select
														value={item.quantity}
														onChange={(e) =>
															updateCartHandler(item, e.target.value)
														}
													>
														{[...Array(item.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</select>
												</td>
												<td className="whitespace-nowrap px-3 py-4">
													{item.price} €
												</td>
												<td className="whitespace-nowrap px-3 py-4">
													<button onClick={() => removeItemHandler(item)}>
														<HiOutlineTrash />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="flex justify-end me-5">
						<div className="flex flex-col text-lg font-bold mt-5">
							<div className="my-5">
								Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
								{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
							</div>
							<div className="flex justify-center">
								<button
									className=" w-full h-10 bg-black text-white text-xl uppercase rounded-full"
									onClick={() => router.push("login?redirect=/shipping")}
								>
									Check Out
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
