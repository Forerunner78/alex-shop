import OrderSummary from "@/components/OrderSummary";
import PaymentMethod from "@/components/PaymentMethod";
import ShippingAddress from "@/components/ShippingAddress";
import { getError } from "@/utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, order: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		case "PAY_REQUEST":
			return { ...state, loadingPay: true };
		case "PAY_SUCCESS":
			return { ...state, loadingPay: false, successPay: true };
		case "PAY_FAIL":
			return { ...state, loadingPay: false, errorPay: action.payload };
		case "PAY_RESET":
			return { ...state, loadingPay: false, successPay: false, errorPay: "" };
		default:
			state;
	}
}

const OrderScreen = () => {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const { query } = useRouter();
	const orderId = query.id;
	const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: "",
	});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/${orderId}`);
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: "PAY_RESET" });
			}
		} else {
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get("/api/keys/paypal");
				paypalDispatch({
					type: "resetOptions",
					value: { "client-id": clientId, currency: "EUR" },
				});
				paypalDispatch({ type: "setLoadingStatus", value: "pending" });
			};
			loadPaypalScript();
		}
	}, [order, orderId, paypalDispatch, successPay]);

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;

	const createOrder = (data, actions) => {
		return actions.order
			.create({ purchase_units: [{ amount: { value: totalPrice } }] })
			.then((orderID) => {
				return orderID;
			});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async function (details) {
			try {
				dispatch({ type: "PAY_REQUEST" });
				const { data } = await axios.put(`/api/orders/${order._id}/pay`, details);
				dispatch({ type: "PAY_SUCCESS", payload: data });
				toast.success("Order is paid successfully");
			} catch (err) {
				dispatch({ type: "PAY_FAIL", payload: getError(err) });
				toast.error(getError(err));
			}
		});
	};

	const onError = (err) => {
		toast.error(getError(err));
	};

	return (
		<>
			<h1 className="text-center font-bold">{`ORDER ${orderId}`}</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div>
					<div className="px-4">
						<div className="border-2 my-5 p-4">
							<ShippingAddress shippingAddress={shippingAddress} />
							{isDelivered ? (
								<div className="bg-green-200 text-green-600 rounded-full m-3 p-2">
									Delivered on {deliveredAt}
								</div>
							) : (
								<div className="bg-red-200 text-red-600 rounded-full m-3 p-2">
									Not delivered
								</div>
							)}
						</div>
						<div className="border-2 my-5 p-4">
							<PaymentMethod paymentMethod={paymentMethod} />
							{isPaid ? (
								<div className="bg-green-200 text-green-600 rounded-full m-3 p-2">
									{paidAt}
								</div>
							) : (
								<div className="bg-red-200 text-red-600 rounded-full m-3 p-2">
									Not paid
								</div>
							)}
						</div>
						<div className="border-2 my-5">
							<h2 className="text-lg font-bold uppercase mb-2 px-4 pt-4">
								Order Items
							</h2>
							<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
									<div className="overflow-hidden"></div>
									<table className="min-w-full text-center text-sm font-light">
										<thead className="border-b font-medium dark:border-neutral-500">
											<tr>
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
													Subtotal
												</th>
											</tr>
										</thead>
										<tbody>
											{orderItems.map((item) => (
												<tr
													key={item.id}
													className="border-t dark:border-neutral-500"
												>
													<td className="whitespace-nowrap px-3 py-4 font-medium">
														<Link href={`/product/${item.id}`}>
															<Image
																src={item.image}
																alt={item.name}
																width={50}
																height={50}
															></Image>
														</Link>
													</td>
													<td className="whitespace-nowrap px-3 py-4">
														{item.quantity}
													</td>
													<td className="whitespace-nowrap px-3 py-4">{`${item.price} €`}</td>
													<td className="whitespace-nowrap px-3 py-4">{`${(
														Math.round(
															item.price * item.quantity * 100
														) / 100
													).toFixed(2)} €`}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="border-2 my-5 p-4">
							<OrderSummary
								itemsPrice={itemsPrice}
								taxPrice={taxPrice}
								shippingPrice={shippingPrice}
								totalPrice={totalPrice}
							/>
						</div>
						{!isPaid && (
							<>
								{isPending ? (
									<div>Loading...</div>
								) : (
									<div className="mt-10">
										<PayPalButtons
											createOrder={createOrder}
											onApprove={onApprove}
											onError={onError}
										></PayPalButtons>
									</div>
								)}
								{loadingPay && <div>Loading...</div>}
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default OrderScreen;

OrderScreen.auth = true;
