const ShippingAddress = ({ shippingAddress }) => {
	const { fullName, address, postalCode, city, country } = shippingAddress;
	return (
		<>
			<h2 className="text-xl md:text-2xl font-bold uppercase mb-2">Shipping Address</h2>
			<ul>
				<li>{fullName}</li>
				<li>{address}</li>
				<li>{postalCode}</li>
				<li className="uppercase">{city}</li>
				<li className="uppercase">{country}</li>
			</ul>
		</>
	);
};

export default ShippingAddress;
