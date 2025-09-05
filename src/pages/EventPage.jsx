import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const eventLoader = async ({ params }) => {
	const { id } = params;
	const response = await fetch(`http://localhost:3000/events/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch event");
	}
	return response.json();
};

export const EventPage = () => {
	const event = useLoaderData();
	return <Heading>{event.title}</Heading>;
};
