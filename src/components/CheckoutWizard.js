const CheckoutWizard = () => {
	return (
		<div>
			{["User Login", "Shipping Address", "Payment Method", "Place Order"].map((step) => (
				<div key={step}>{step}</div>
			))}
		</div>
	);
};

export default CheckoutWizard;
