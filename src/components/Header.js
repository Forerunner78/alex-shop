import Link from "next/link";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropDownLink from "./DropDownLink";
import Cookies from "js-cookie";
import { IoCartOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
	const { status, data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

	return (
		<header className="p-5 mb-10 flex flex-row justify-between">
			<section>
				<Link href="/">
					<Image
						src={Logo}
						alt="Logo of the website"
						className=" rounded-circle"
						width={70}
						height={70}
						priority
					/>
				</Link>
			</section>
			<section className="flex items-center">
				<h1 className="text-center text-2xl uppercase">
					<Link href="/">Alex&apos;s Shop</Link>
				</h1>
			</section>
			<section className="flex flex-row justify-between items-center text-2xl">
				<div className="mx-2">
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
				<div className="mx-2">
					<CgProfile />
					{/* {status === "loading" ? (
						"Loading"
					) : session?.user ? (
						<Menu as="div">
							<Menu.Button>{session.user.name}</Menu.Button>
							<Menu.Items>
								<Menu.Item>
									<DropDownLink href="/profile">Profile</DropDownLink>
								</Menu.Item>
								<Menu.Item>
									<DropDownLink href="/order-history">Order History</DropDownLink>
								</Menu.Item>
								<Menu.Item>
									<a href="#" onClick={logoutClickHandler}>
										Logout
									</a>
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<Link href="/login">Login</Link>
					)} */}
				</div>
			</section>
		</header>
	);
};

export default Header;
