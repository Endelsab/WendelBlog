import React from "react";
import { Loader } from "lucide-react";

const LoadingButton = ({ isLoading, children, disabled, ...props }) => {
	return (
		<button
			disabled={isLoading || disabled}
			className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${
				isLoading ? "cursor-not-allowed" : ""
			}`}
			{...props}>
			{isLoading ? (
				<>
					<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
					Loading...
				</>
			) : (
				children
			)}
		</button>
	);
};

export default LoadingButton;
