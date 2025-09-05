import React from "react";
import { Heading } from "@chakra-ui/react";

import { useLoaderData } from "react-router-dom";
import { EventItem } from "../components/EventItem";

export const eventsLoader = async () => {
	const [eventsResponse, categoriesResponse] = await Promise.all([fetch("http://localhost:3000/events"), fetch("http://localhost:3000/categories")]);
	if (!eventsResponse.ok || !categoriesResponse.ok) {
		throw new Error("Events or categories could not be fetched");
	}
	const events = await eventsResponse.json();
	const categories = await categoriesResponse.json();
	return { events, categories };
};

export const EventsPage = () => {
	const { events, categories } = useLoaderData();
	return (
		<>
			<Heading>List of events</Heading>
			{events && events.length > 0 ? (
				events.map((event) => (
					<div key={event.id}>
						<EventItem event={{ ...event, categories }} />
					</div>
				))
			) : (
				<div>Geen events gevonden.</div>
			)}
		</>
	);
};
