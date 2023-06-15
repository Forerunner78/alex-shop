const Layout = ({ children, className = "" }) => {
	return (
		<div className={`mt-[20vh] mx-10 lg:mx-[20vw] bg-slate-200 p-10 ${className}`}>
			{children}
		</div>
	);
};

export default Layout;
