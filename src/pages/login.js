import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Buttons/ButtonComponent";
import EmailInput from "@/components/Form/EmailInput";
import PasswordInput from "@/components/Form/PasswordInput";
import Layout from "@/components/Layout";
import PageTitle from "@/components/Title/PageTitle";

const LoginScreen = () => {
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
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		try {
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
				<PageTitle title="Login" />
				<div className="sm:flex sm:flex-row sm:justify-around">
					<EmailInput register={register} errors={errors} />
					<PasswordInput register={register} errors={errors} />
				</div>

				<div className="flex justify-center m-10">
					<Button className="w-[50%]" text="Login" />
				</div>

				<div className="text-sm lg:text-lg text-center">
					<div>Don&apos;t have an account? &nbsp;</div>
					<div>
						<Link
							className="underline"
							href={`/createaccount?redirect=${redirect || "/"}`}
						>
							Create an account
						</Link>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default LoginScreen;
