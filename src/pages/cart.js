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
import PageTitle from "@/components/Title/PageTitle";

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
		<Layout className="w-full mx-5 sm:mx-[15vw] pb-5 lg:mt-[15vh]">
			<PageTitle title="Your Shopping Cart" />
			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<>
					<div className="overflow-x-auto sm:mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8 overflow-x-auto">
							<div className="overflow-hidden flex justify-center">
								<table className="w-[90%] text-center text-sm font-light">
									<thead className="font-medium">
										<tr className="md:text-xl ">
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
												<td className="relative whitespace-nowrap px-3 my-2 font-medium flex justify-center h-[10vh] md:h-[15vh] lg:h-[30vh] ">
													<Link href={`/product/${item.id}`}>
														<Image
															src={item.image}
															alt={item.name}
															fill
															className="object-contain"
														/>
													</Link>
												</td>
												<td className="whitespace-nowrap px-3">
													<select
														value={item.quantity}
														className="bg-slate-200 w-9"
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
												<td className="whitespace-nowrap px-3">
													{item.price} €
												</td>
												<td className="whitespace-nowrap px-3">
													<button onClick={() => removeItemHandler(item)}>
														<HiOutlineTrash />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="flex justify-end me-5 md:me-10 lg:me-[5vw]">
								<div className="flex flex-col text-lg md:text-xl font-bold mt-5">
									<div className="my-5">
										Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
										{cartItems
											.reduce((a, c) => a + c.quantity * c.price, 0)
											.toFixed(2)}{" "}
										€
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
					</div>
				</>
			)}
		</Layout>
	);
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
