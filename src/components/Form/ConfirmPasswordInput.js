import ErrorMessage from "../ErrorMessage";

const ConfirmPasswordInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4 lg:w-[30vw]">
			<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="confirmPassword">
				Confirm Password :
			</label>
			<input
				type="password"
				id="confirmPassword"
				className="rounded border-2"
				placeholder="Confirm your password"
				{...register("confirmPassword", {
					required: "Please enter your password a second time",
					validate: (value) => value === getValues("password"),
					minLength: {
						value: 8,
						message: "Password should have at least 8 characters",
					},
				})}
			></input>
			{errors.confirmPassword && (
				<ErrorMessage errorMessage={errors.confirmPassword.message} />
			)}
			{errors.confirmPassword && errors.confirmPassword.type === "validate" && (
				<ErrorMessage errorMessage="Passwords do not match" />
			)}
		</div>
	);
};

export default ConfirmPasswordInput;
