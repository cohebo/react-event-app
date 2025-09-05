import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const eventsLoader = async () => {
	const response = await fetch("http://localhost:3000/events");
	if (!response.ok) {
		throw new Error("Events could not be fetched");
	}
	return await response.json();
};

export const EventsPage = () => {
	const events = useLoaderData();
	return (
		<>
			<Heading>List of events</Heading>
			{events && events.length > 0 ? events.map((event) => <div key={event.id}>{event.title}</div>) : <div>Geen events gevonden.</div>}
		</>
	);
};
