import { useScroll } from "@/utils/hooks/useScroll";

const CheckoutWizard = ({ activeStep = 0 }) => {
	const progressValue = { 0: "25%", 1: "50%", 2: "75%", 3: "100%" };
	const progressBar = progressValue[activeStep];
	const isScrolled = useScroll();

	const hiddenCheckoutWizard = isScrolled === true ? "hidden" : "";

	return (
		<div className="fixed top-[10vh] w-[100vw]">
			<div className="flex flex-row justify-between px-5 mb-2">
				{["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
					(step, index) => (
						<div
							key={step}
							className={`${
								index == activeStep ? "text-black font-bold" : "text-gray-400"
							} text-md sm:text-lg text-center px-2 ${hiddenCheckoutWizard}`}
						>
							{step}
						</div>
					)
				)}
			</div>
			<div className={`mb-6 h-1 w-full bg-neutral-200 ${hiddenCheckoutWizard}`}>
				<div className="h-1 bg-black" style={{ width: progressBar }}></div>
			</div>
		</div>
	);
};

export default CheckoutWizard;
