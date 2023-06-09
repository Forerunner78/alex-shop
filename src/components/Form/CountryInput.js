import ErrorMessage from "../ErrorMessage";

const CountryInput = ({ register, errors }) => {
	return (
		<div className="flex flex-col mb-6 px-4">
			<label className="uppercase font-bold mb-2" htmlFor="country">
				Country :
			</label>
			<input
				id="country"
				className="rounded border-2"
				placeholder="Country"
				autoFocus
				{...register("country", {
					required: "Please enter a country",
				})}
			/>
			{errors.country && <ErrorMessage errorMessage={errors.country.message} />}
		</div>
	);
};

export default CountryInput;
