import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
	Mail,
	EyeClosedIcon,
	EyeIcon,
	Lock,
	UserPlus,
	ArrowRight,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

import LoadingButton from "../components/LoadingButton";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { loading, login } = useUserStore();

	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleValidation = () => {
		const errors = {};
		if (!formData.email.includes("@")) errors.email = "Invalid email address";
		if (formData.password.length < 6)
			errors.password = "Password must be at least 6 characters";
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!handleValidation()) return;
		const success = await login(formData);
		if (success) {
			navigate("/");
		} else {
			console.log("Unable to login");
		}
	};

	return (
		<div className="flex flex-col justify-center mt-20 relative z-10">
			{/* Header */}
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-sky-500">
					Login your account
				</h2>
			</motion.div>

			{/* Form */}
			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg rounded-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}>
				<div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-500">
								Email Address
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-sky-500" aria-hidden="true" />
								</div>
								<input
									id="email"
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-xs">{errors.email}</p>
							)}
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-600">
								Password
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-sky-400" aria-hidden="true" />
								</div>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-sky-500 focus:outline-none">
									{showPassword ? <EyeClosedIcon /> : <EyeIcon />}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-xs">{errors.password}</p>
							)}
						</div>

						{/* Submit Button */}
						<LoadingButton isLoading={loading} type="submit" disabled={loading}>
							<UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
							Login
						</LoadingButton>
					</form>

					{/* Footer */}
					<p className="mt-8 text-center text-sm text-gray-500">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-medium text-sky-600 hover:text-sky-500">
							signup here <ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
