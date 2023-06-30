const Layout = ({ children, className = "" }) => {
	return <div className={`${className} bg-slate-200 rounded-2xl`}>{children}</div>;
};

export default Layout;
