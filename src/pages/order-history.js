import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PageTitle from "@/components/Title/PageTitle";
import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, orders: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

const OrderHistoryScreen = () => {
	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: "",
	});
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/history`);
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		fetchOrders();
	}, []);
	return (
		<>
			{loading ? (
				<Loading />
			) : error ? (
				<div>{error}</div>
			) : (
				<Layout className="mx-5 mt-10 lg:mt-[15vh] w-[80vw] min-h-[70vh]">
					<div className="px-4">
						<PageTitle title="Order History" />
						<div className="overflow-x-auto sm:mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8 overflow-x-auto">
								<div className="overflow-hidden flex justify-center">
									<table className="w-[90%] text-center text-sm font-light">
										<thead>
											<tr className="md:text-xl">
												<th scope="col" className="px-2 py-4">
													ID
												</th>
												<th scope="col" className="px-2 py-4">
													DATE
												</th>
												<th scope="col" className="px-2 py-4">
													TOTAL
												</th>
												<th scope="col" className="px-2 py-4">
													PAID
												</th>
												<th scope="col" className="px-2 py-4">
													DELIVERED
												</th>
												<th scope="col" className="px-2 py-4">
													ACTION
												</th>
											</tr>
										</thead>
										<tbody>
											{orders.map((order) => (
												<tr
													key={order._id}
													className="py-2 bg-slate-400 border-t"
												>
													<td>{order._id.substring(0, 6)}</td>
													<td className="whitespace-nowrap px-3 py-4 font-medium">
														{order.createdAt.substring(0, 10)}
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														{order.totalPrice} €
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														{order.isPaid
															? `${order.paidAt}`
															: "Not paid"}
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														{order.isDelivered
															? `${order.deliveredAt.substring(
																	0,
																	10
															  )}`
															: "Not delivered"}
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														<Link href={`/order/${order._id}`}>
															Details
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
};

export default OrderHistoryScreen;
OrderHistoryScreen.auth = true;
