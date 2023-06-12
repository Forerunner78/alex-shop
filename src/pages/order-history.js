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
	console.log(orders);
	return (
		<>
			<h1 className="text-3xl font-bold text-center mb-10">Order History</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full text-center text-sm font-light">
								<thead className="border-b font-medium dark:border-neutral-500">
									<tr>
										{/* <th scope="col" className="px-2 py-4">
											ID
										</th> */}
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
										<tr key={order._id} className="border-b">
											{/* <td>{order._id.substring(20, 24)}</td> */}
											<td className="whitespace-nowrap px-3 py-4 font-medium">
												{order.createdAt.substring(0, 10)}
											</td>
											<td className="whitespace-nowrap px-3 py-4">
												{order.totalPrice} €
											</td>
											<td className="whitespace-nowrap px-3 py-4">
												{order.isPaid ? `${order.paidAt}` : "Not paid"}
											</td>
											<td className="whitespace-nowrap px-3 py-4">
												{order.isDelivered
													? `${order.deliveredAt.substring(0, 10)}`
													: "Not delivered"}
											</td>
											<td className="whitespace-nowrap px-3 py-4">
												<Link href={`/order/${order._id}`}>Details</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderHistoryScreen;
OrderHistoryScreen.auth = true;
