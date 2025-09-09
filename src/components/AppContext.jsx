import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchAll = async () => {
		setLoading(true);
		setError(null);
		try {
			const [eventsRes, categoriesRes, usersRes] = await Promise.all([fetch("http://localhost:3000/events"), fetch("http://localhost:3000/categories"), fetch("http://localhost:3000/users")]);
			if (!eventsRes.ok) throw new Error("Failed to fetch events");
			if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
			if (!usersRes.ok) throw new Error("Failed to fetch users");
			const [eventsData, categoriesData, usersData] = await Promise.all([eventsRes.json(), categoriesRes.json(), usersRes.json()]);
			setEvents(eventsData);
			setCategories(categoriesData);
			setUsers(usersData);
		} catch (e) {
			setError(e.message);
			setEvents([]);
			setCategories([]);
			setUsers([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAll();
	}, []);

	const addEvent = async (event) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(event),
			});
			if (!res.ok) throw new Error("Failed to add event");
			await fetchAll();
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	const updateEvent = async (event) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`http://localhost:3000/events/${event.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(event),
			});
			if (!res.ok) throw new Error("Failed to update event");
			await fetchAll();
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteEvent = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`http://localhost:3000/events/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete event");
			await fetchAll();
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AppContext.Provider
			value={{
				events,
				categories,
				users,
				addEvent,
				updateEvent,
				deleteEvent,
				fetchAll,
				loading,
				error,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
