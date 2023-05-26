import Link from "next/link";

const DropDownLink = (props) => {
	let { href, children, ...rest } = props;
	return <Link href={href}>{children}</Link>;
};

export default DropDownLink;
