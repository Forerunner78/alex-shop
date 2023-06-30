import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState, Fragment } from "react";
import { CgProfile } from "react-icons/cg";
import Loading from "./Loading";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import Layout from "./Layout";

const DropDownMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { status, data: session } = useSession();
	const { dispatch } = useContext(Store);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className="inset-0 flex items-center justify-center">
				<button type="button" onClick={openModal} className="">
					<CgProfile />
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="mt-10">
										{session?.user ? (
											<Layout>
												<div className="py-5 text-3xl text-center">{`Welcome ${session.user.name} !`}</div>

												<div className="border-t-4 border-t-white py-3 text-xl text-center">
													<Link href="/profile" onClick={closeModal}>
														Profile
													</Link>
												</div>

												<div className="border-y-4 border-y-white py-3 text-xl text-center">
													<Link
														href="/order-history"
														onClick={closeModal}
													>
														Order History
													</Link>
												</div>
												<div className="py-3 text-xl text-center">
													<Link href="#" onClick={logoutClickHandler}>
														Logout
													</Link>
												</div>
											</Layout>
										) : (
											<div className=" text-xl text-center h-[20vh]">
												<Layout className="flex items-center justify-center h-[20vh]">
													<Link
														href="/login"
														className="text-4xl font-bold"
														onClick={closeModal}
													>
														Login
													</Link>
												</Layout>
											</div>
										)}

										<div className="absolute top-5 right-5">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={closeModal}
											>
												X
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default DropDownMenu;
