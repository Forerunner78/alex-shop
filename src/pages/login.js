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
		<Layout className="p-0 h-[50vh] sm:h-[45vh]">
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1 className="text-3xl md:text-4xl lg:text-5xl pt-5 font-bold text-center mb-10">
					Login
				</h1>
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
