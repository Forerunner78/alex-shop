import Button from "@/components/Buttons/ButtonComponent";
import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentScreen = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress, paymentMethod } = cart;
	const router = useRouter();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!selectedPaymentMethod) {
			return toast.error("Payment method is required");
		}
		dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
		Cookies.set("cart", JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }));
		router.push("/placeorder");
	};

	useEffect(() => {
		if (!shippingAddress.address) {
			return router.push("/shipping");
		}
		setSelectedPaymentMethod(paymentMethod || "");
	}, [paymentMethod, router, shippingAddress.address]);

	return (
		<>
			<CheckoutWizard activeStep={2} />
			<h1 className="text-3xl font-bold text-center mb-10">Payment Method</h1>
			<form className="px-4" onSubmit={submitHandler}>
				{["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
					<div className="my-5" key={payment}>
						<input
							name="paymentMethod"
							id={payment}
							type="checkbox"
							checked={selectedPaymentMethod === payment}
							onChange={() => setSelectedPaymentMethod(payment)}
						/>
						<label className="ms-2 mb-2" htmlFor={payment}>
							{payment}
						</label>
					</div>
				))}
				<div className="flex justify-around mt-10">
					<Button
						className="min-w-25 px-5"
						onClick={() => router.push("/shipping")}
						text="&lt; Back"
					/>
					<Button className=" min-w-25 px-5" text="Next &gt;" />
				</div>
			</form>
		</>
	);
};

export default PaymentScreen;

PaymentScreen.auth = true;
