import ErrorMessage from "../ErrorMessage";

const FullNameInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4 lg:w-[30vw]">
			<label className="uppercase font-bold mb-2 lg:text-xl" htmlFor="postalCode">
				Postal Code :
			</label>
			<input
				id="postalCode"
				className="rounded border-2"
				placeholder="Postal code"
				autoFocus
				{...register("postalCode", {
					required: "Please enter a postal code",
				})}
			/>
			{errors.postalCode && <ErrorMessage errorMessage={errors.postalCode.message} />}
		</div>
	);
};

export default FullNameInput;
