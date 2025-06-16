import React from "react";

const Loader = () => {
	return (
		<div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-lg">
			<div className="h-25 w-25 border-cyan-950 border-16 rounded-full border-r-transparent animate-spin m-8"></div>
		</div>
	);
};

export default Loader;
