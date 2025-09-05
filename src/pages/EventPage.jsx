import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const eventLoader = async ({ params }) => {
	const [eventRes, categoriesRes] = await Promise.all([fetch(`http://localhost:3000/events/${params.id}`), fetch("http://localhost:3000/categories")]);
	if (!eventRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");
	const event = await eventRes.json();
	const categories = await categoriesRes.json();
	return { ...event, categories };
};

export const EventPage = () => {
	const event = useLoaderData();
	return <Heading>{event.title}</Heading>;
};
