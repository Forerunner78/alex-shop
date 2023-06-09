import Button from "@/components/Buttons/ButtonComponent";
import EmailInput from "@/components/Form/EmailInput";
import PasswordInput from "@/components/Form/PasswordInput";
import ConfirmPasswordInput from "@/components/Form/ConfirmPasswordInput";
import { getError } from "@/utils/error";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FullNameInput from "@/components/Form/FullNameInput";

const ProfileScreen = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("name", session.user.name);
		setValue("email", session.user.email);
	}, [session.user, setValue]);

	const submitHandler = async ({ name, email, password }) => {
		try {
			await axios.put("/api/auth/update", { name, email, password });
			const result = await signIn("credentials", { redirect: false, email, password });
			toast.success("Profile updated successfully");
			router.push("/");

			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1 className="text-3xl font-bold text-center mb-10">Update Your Profile</h1>
				<FullNameInput register={register} errors={errors} />
				<EmailInput register={register} errors={errors} />
				<PasswordInput register={register} errors={errors} />
				<ConfirmPasswordInput register={register} errors={errors} />
				<div className="flex justify-center m-10">
					<Button className="w-[100%]" text="Update your profile" />
				</div>
			</form>
		</>
	);
};

export default ProfileScreen;
ProfileScreen.auth = true;
