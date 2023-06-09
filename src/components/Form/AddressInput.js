import ErrorMessage from "../ErrorMessage";

const FullAddressInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4">
			<label className="uppercase font-bold mb-2" htmlFor="address">
				Address :
			</label>
			<input
				id="address"
				className="rounded border-2"
				placeholder="Address"
				autoFocus
				{...register("address", {
					required: "Please enter an address",
					minLength: {
						value: 3,
						message: "Address should be more than 2 characters",
					},
				})}
			/>
			{errors.address && <ErrorMessage errorMessage={errors.address.message} />}
		</div>
	);
};

export default FullAddressInput;
