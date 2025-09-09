import ReactDOM from "react-dom/client";
import { Root } from "./components/Root";
import { AppProvider } from "./components/AppContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <EventsPage />,
			},
			{
				path: "events/:id",
				element: <EventPage />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider>
		<ErrorBoundary>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</ErrorBoundary>
	</ChakraProvider>
);
