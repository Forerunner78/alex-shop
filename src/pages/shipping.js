import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const ShippingScreen = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress } = cart;
	const router = useRouter();

	useEffect(() => {
		setValue("fullName", shippingAddress.fullName);
		setValue("address", shippingAddress.address);
		setValue("city", shippingAddress.city);
		setValue("postalCode", shippingAddress.postalCode);
		setValue("country", shippingAddress.country);
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: "SAVE_SHIPPING_ADDRESS",
			payload: { fullName, address, city, postalCode, country },
		});
		Cookies.set(
			"cart",
			JSON.stringify({
				...cart,
				shippingAddress: { fullName, address, city, postalCode, country },
			})
		);
		router.push("/payment");
	};
	return (
		<>
			<CheckoutWizard activeStep={1} />
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1>Shipping Address</h1>
				<div>
					<label htmlFor="fullName">Name</label>
					<input
						id="fullName"
						autoFocus
						{...register("fullName", { required: "Please enter a full name" })}
					/>
					{errors.fullName && <div>{errors.fullName.message}</div>}
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input
						id="address"
						autoFocus
						{...register("address", {
							required: "Please enter an address",
							minLength: {
								value: 3,
								message: "Address should be more than 2 characters",
							},
						})}
					/>
					{errors.address && <div>{errors.address.message}</div>}
				</div>
				<div>
					<label htmlFor="city">City</label>
					<input
						id="city"
						autoFocus
						{...register("city", {
							required: "Please enter a city",
						})}
					/>
					{errors.city && <div>{errors.city.message}</div>}
				</div>
				<div>
					<label htmlFor="postalCode">Postal Code</label>
					<input
						id="postalCode"
						autoFocus
						{...register("postalCode", {
							required: "Please enter a postal code",
						})}
					/>
					{errors.postalCode && <div>{errors.postalCode.message}</div>}
				</div>
				<div>
					<label htmlFor="country">Country</label>
					<input
						id="country"
						autoFocus
						{...register("country", {
							required: "Please enter a country",
						})}
					/>
					{errors.country && <div>{errors.country.message}</div>}
				</div>
				<div>
					<button>Next</button>
				</div>
			</form>
		</>
	);
};

ShippingScreen.auth = true;

export default ShippingScreen;
