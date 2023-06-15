import Button from "@/components/Buttons/ButtonComponent";
import CheckoutWizard from "@/components/CheckoutWizard";
import ErrorMessage from "@/components/ErrorMessage";
import AddressInput from "@/components/Form/AddressInput";
import PostalCodeInput from "@/components/Form/PostalCodeInput";
import FullNameInput from "@/components/Form/FullNameInput";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CityInput from "@/components/Form/CityInput";
import CountryInput from "@/components/Form/CountryInput";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";

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
			<Layout className="mb-20">
				<PageTitle title="Your Shipping Address" />
				<form
					className="relative grid grid-cols-1 sm:grid-cols-2"
					onSubmit={handleSubmit(submitHandler)}
				>
					<FullNameInput register={register} errors={errors} />
					<AddressInput register={register} errors={errors} />
					<CityInput register={register} errors={errors} />
					<PostalCodeInput register={register} errors={errors} />
					<CountryInput register={register} errors={errors} />
					<Button
						className="absolute -bottom-[23%] sm:-bottom-[50%] w-full"
						text="Next"
					/>
				</form>
			</Layout>
		</>
	);
};

ShippingScreen.auth = true;

export default ShippingScreen;
