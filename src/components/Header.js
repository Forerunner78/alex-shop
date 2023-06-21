import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { IoCartOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import DropDownMenu from "./DropDownMenu";
import WebsiteTitle from "./Title/WebsiteTitle";
import { useScroll } from "@/utils/hooks/useScroll";

const Header = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const isScrolled = useScroll();
	const headerBackground = isScrolled === true ? "bg-white border-b-2" : "bg-transparent";

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	return (
		<header
			className={`fixed top-0 p-5 w-[100vw] h-[10vh] flex flex-row justify-between z-50 ${headerBackground}`}
		>
			<section className="flex items-center">
				<WebsiteTitle className="lg:text-6xl 2xl:text-7xl" />
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
