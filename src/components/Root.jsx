import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export const Root = () => (
	<>
		<Navigation />
		<Outlet />
	</>
);
