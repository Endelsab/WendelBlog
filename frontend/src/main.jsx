import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./layout/MainLayout.jsx";

import "./index.css";

import Homepage from "./pages/Homepage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/register",
				element: <RegisterPage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
