import React from "react";
import { SimpleGrid, Container, Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventItem } from "../components/EventItem";
import { SearchBar } from "../components/SearchBar";

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
	const [search, setSearch] = React.useState("");

	const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase()));

	return (
		<Box bg="gray.50">
			<Container
				maxWidth="1200px"
				paddingY={8}
				bg="gray.50">
				<Box
					mb={6}
					display="flex"
					justifyContent="center">
					<SearchBar
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Zoek op titel of omschrijving..."
					/>
				</Box>
				<SimpleGrid
					columns={[1, 2, 3]}
					spacing={4}>
					{filteredEvents && filteredEvents.length > 0 ? (
						filteredEvents.map((event) => (
							<div key={event.id}>
								<EventItem event={{ ...event, categories }} />
							</div>
						))
					) : (
						<div>Geen events gevonden.</div>
					)}
				</SimpleGrid>
			</Container>
		</Box>
	);
};
