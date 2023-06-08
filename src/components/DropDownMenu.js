import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";

const DropDownMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { status, data: session } = useSession();
	const { dispatch } = useContext(Store);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

	const handleClick = () => {
		isOpen === false ? setIsOpen(true) : setIsOpen(false);
	};

	return (
		<>
			<button className="" onClick={handleClick}>
				<CgProfile />
			</button>
			{isOpen ? (
				<div className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-lg backdrop-blur-md py-30">
					{status === "loading" ? (
						"Loading"
					) : session?.user ? (
						<div>
							<div className="flex justify-end">
								<button
									className="w-5 mt-3 border-2 border-white"
									onClick={() => setIsOpen(false)}
								>
									X
								</button>
							</div>

							<div className="py-10 text-3xl">{`Welcome ${session.user.name} !`}</div>
							<div className="divide-y-4 divide-slate-200">
								<div className="py-3 text-xl text-center">
									<Link
										className=""
										href="/profile"
										onClick={() => setIsOpen(false)}
									>
										Profile
									</Link>
								</div>

								<div className="py-3 text-xl text-center">
									<Link href="/order-history" onClick={() => setIsOpen(false)}>
										Order History
									</Link>
									<span className="h-[3px] inline-block bg-white absolute left-[12.5%] -bottom-1  w-[75%]" />
								</div>
								<div className="py-3 text-xl text-center">
									<Link href="#" onClick={logoutClickHandler}>
										Logout
									</Link>
								</div>
							</div>
						</div>
					) : (
						<Link href="/login" onClick={() => setIsOpen(false)}>
							Click to login
						</Link>
					)}
				</div>
			) : null}
		</>
	);
};

export default DropDownMenu;
