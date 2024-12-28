import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
	User,
	Mail,
	Lock,
	UserPlus,
	ArrowRight,
	EyeIcon,
	EyeClosedIcon,
	Eye,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router";
import LoadingButton from "../components/LoadingButton";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, signup } = useUserStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const success = await signup(formData); // Call signup and await result

		if (success) {
			navigate("/"); // Navigate only if signup succeeds
		} else {
			console.error("Signup failed. Stay on the page.");
		}
	};
	return (
		<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
			{/* Header */}
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-sky-500">
					Create your account
				</h2>
			</motion.div>

			{/* Form */}
			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg rounded-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}>
				<div className="bg-white me-2 md:me-0 py-8 px-6 shadow-lg rounded-lg sm:px-10">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Firstname Field */}
						<div>
							<label
								htmlFor="firstname"
								className="block text-sm font-medium text-gray-500">
								Firstname
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-sky-500" aria-hidden="true" />
								</div>
								<input
									id="firstname"
									type="text"
									required
									value={formData.firstname}
									onChange={(e) =>
										setFormData({ ...formData, firstname: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Lastname Field */}
						<div>
							<label
								htmlFor="lastname"
								className="block text-sm font-medium text-gray-500">
								Lastname
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-sky-500" aria-hidden="true" />
								</div>
								<input
									id="lastname"
									type="text"
									required
									value={formData.lastname}
									onChange={(e) =>
										setFormData({ ...formData, lastname: e.target.value })
									}
									className="block w-full px-3 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
								/>
							</div>
						</div>

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
						</div>

						{/* Submit Button */}
						<LoadingButton isLoading={loading} type="submit" disabled={loading}>
							<UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
							Sign Up
						</LoadingButton>
					</form>

					{/* Footer */}
					<p className="mt-8 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-sky-600 hover:text-sky-500">
							Login here <ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default RegisterPage;
