const OrderSummary = ({ itemsPrice, taxPrice, shippingPrice, totalPrice }) => {
	return (
		<>
			<h2 className="text-lg font-bold uppercase mb-2">Order Summary</h2>
			<ul>
				<li>
					<div className="flex flex-row justify-between mx-10 my-2">
						<div>Items</div>
						<div>{itemsPrice} €</div>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between mx-10 my-2">
						<div>Tax</div>
						<div>{taxPrice} €</div>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between mx-10 my-2">
						<div>Shipping</div>
						<div>{shippingPrice} €</div>
					</div>
				</li>
				<li>
					<div className="flex flex-row justify-between mx-10 my-2">
						<div>Total</div>
						<div>{totalPrice} €</div>
					</div>
				</li>
			</ul>
		</>
	);
};

export default OrderSummary;
