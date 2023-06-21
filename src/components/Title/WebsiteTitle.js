import Link from "next/link";

const WebsiteTitle = ({ className = "" }) => {
	return (
		<Link href="/">
			<h1
				className={`uppercase text-3xl md:text-5xl text-center flex flex-row md:ps-10 xl:ps-[15vw] ${className}`}
			>
				<div className="px-2 md:px-4">Alex</div>
				<div className="px-2 md:px-4">Shop</div>{" "}
			</h1>
		</Link>
	);
};

export default WebsiteTitle;
