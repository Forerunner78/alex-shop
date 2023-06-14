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
			<button onClick={handleClick}>
				<CgProfile />
			</button>
			{isOpen ? (
				<div className="min-w-[10vw] flex flex-col justify-between z-30 items-center absolute top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-lg backdrop-blur-md py-30">
					{status === "loading" ? (
						"Loading"
					) : session?.user ? (
						<div>
							<div className="flex justify-end">
								<button
									className="w-5 mt-3 me-3 border-2 border-white"
									onClick={() => setIsOpen(false)}
								>
									X
								</button>
							</div>

							<div className="py-5 text-3xl text-center">{`Welcome ${session.user.name} !`}</div>
							<div className="">
								<div className="py-3 text-xl text-center">
									<Link href="/profile" onClick={() => setIsOpen(false)}>
										Profile
									</Link>
								</div>

								<div className="border-y-4 py-3 text-xl text-center">
									<Link href="/order-history" onClick={() => setIsOpen(false)}>
										Order History
									</Link>
								</div>
								<div className="py-3 text-xl text-center">
									<Link href="#" onClick={logoutClickHandler}>
										Logout
									</Link>
								</div>
							</div>
						</div>
					) : (
						<div className="relative p-10">
							<Link className="" href="/login" onClick={() => setIsOpen(false)}>
								Login
							</Link>
							<button
								className="absolute w-5 top-0.5 right-1.5 mt-1 border-2 border-white text-xs"
								onClick={() => setIsOpen(false)}
							>
								X
							</button>
						</div>
					)}
				</div>
			) : null}
		</>
	);
};

export default DropDownMenu;
