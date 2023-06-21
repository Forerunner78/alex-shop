import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@/components/Buttons/ButtonComponent";
import EmailInput from "@/components/Form/EmailInput";
import PasswordInput from "@/components/Form/PasswordInput";
import ConfirmPasswordInput from "@/components/Form/ConfirmPasswordInput";
import FullNameInput from "@/components/Form/FullNameInput";
import Layout from "@/components/Layout";

const CreateAccountScreen = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || "/");
		}
	}, [router, session, redirect]);

	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ name, email, password }) => {
		try {
			await axios.post("/api/auth/signup", { name, email, password });
			const result = await signIn("credentials", { redirect: false, email, password });
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<Layout className="w-full mx-5 sm:mx-[15vw] pb-5">
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1 className="text-3xl md:text-4xl lg:text-5xl pt-5 font-bold text-center mb-10">
					Create Account
				</h1>
				<div className="lg:flex lg:flex-row lg:justify-around">
					<FullNameInput register={register} errors={errors} />
					<EmailInput register={register} errors={errors} />
				</div>
				<div className="lg:flex lg:flex-row lg:justify-around">
					<PasswordInput register={register} errors={errors} />
					<ConfirmPasswordInput register={register} errors={errors} />
				</div>

				<div className="flex justify-center my-10">
					<Button className="w-[70vw] sm:w-[50vw] lg:w-[30vw]" text="Create Account" />
				</div>
			</form>
		</Layout>
	);
};

export default CreateAccountScreen;
