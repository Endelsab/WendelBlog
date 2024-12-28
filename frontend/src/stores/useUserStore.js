import { create } from "zustand";

import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useUserStore = create((set, get) => ({
	loading: false,
	user: null,

	checkIsLogin: async () => {
		try {
			set({ loading: true });

			const { data } = await axiosInstance.get("/user/getUser");
			set({ user: data });
		} catch (error) {
			console.error(
				"checkIsLogin error:",
				error?.response?.data?.message || error.message,
			);
			set({ user: null });
		} finally {
			set({ loading: false });
		}
	},

	signup: async (signUpForm) => {
		set({ loading: true });
		try {
			const { data } = await axiosInstance.post("/user/signUp", signUpForm);
			set({ user: data });
			toast.success("Signup successfully");
			return true;
		} catch (error) {
			toast.error(error?.response?.data?.message || "Signup failed ");

			set({ user: null });
			return false;
		} finally {
			set({ loading: false });
		}
	},
	login: async (loginForm) => {
		set({ loading: true });

		try {
			const { data } = await axiosInstance.post("/user/login", loginForm);
			set({ user: data });
			toast.success("login successfully");
			return true;
		} catch (error) {
			toast.error(error?.response?.data?.message || "login failed ");

			set({ user: null });
			return false;
		} finally {
			set({ loading: false });
		}
	},
}));
