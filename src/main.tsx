import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalContextProvider } from "./context/global-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalContextProvider>
				<App />
			</GlobalContextProvider>
			<Toaster position="top-center" />
		</BrowserRouter>
	</React.StrictMode>,
);
