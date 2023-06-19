import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { IoCartOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import DropDownMenu from "./DropDownMenu";

const Header = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const [scrollPosition, setScrollPosition] = useState(0);
	const [headerBackground, setHeaderBackground] = useState("transparent");

	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrollPosition(position);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (scrollPosition > 0) {
			setHeaderBackground("bg-white");
		} else {
			setHeaderBackground("bg-transparent");
		}
	}, [scrollPosition]);

	const headerLimit = headerBackground === "bg-white" ? "border-b-2" : "";

	return (
		<header
			className={`fixed top-0 p-5 w-[100vw] h-[10vh] flex flex-row justify-between z-50 ${headerBackground} ${headerLimit}`}
		>
			<section className="flex items-center">
				<Link href="/">
					<h1 className="text-center text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl md:ps-10 xl:ps-[15vw] uppercase flex flex-row">
						<div className="px-2 md:px-4">Alex</div>
						<div className="px-2 md:px-4">Shop</div>
					</h1>
				</Link>
			</section>
			<section className="flex flex-row items-center text-2xl md:text-3xl">
				<div className="mx-4">
					<Link href="/cart">
						<div className="relative ">
							{cartItemsCount > 0 ? <IoCartSharp /> : <IoCartOutline />}
							<div className=""></div>
							<span className="absolute text-[12px] w-[20px] h-[20px] -top-[1rem] left-[1rem] bg-black rounded-full">
								<span className="absolute -top-[0.4rem] left-[0.4rem] text-white">
									{cartItemsCount}
								</span>
							</span>
						</div>
					</Link>
				</div>
				<div className="mx-4 flex items-center">
					<DropDownMenu />
				</div>
			</section>
		</header>
	);
};

export default Header;
