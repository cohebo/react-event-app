import { useState } from "react";
import { SimpleGrid, Container, Box } from "@chakra-ui/react";
import { CategoryFilter } from "../components/CategoryFilter";
import { EventItem } from "../components/EventItem";
import { SearchBar } from "../components/SearchBar";
import { useAppContext } from "../components/AppContext";

export const EventsPage = () => {
	const { events, categories, loading, error } = useAppContext();
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState([]);

	const filteredEvents = events.filter((event) => {
		const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = !selectedCategory.length || (event.categoryIds && event.categoryIds.some((id) => selectedCategory.includes(String(id))));
		return matchesSearch && matchesCategory;
	});

	return (
		<Box
			bg="gray.50"
			minHeight="100vh">
			<Container
				maxWidth="1200px"
				paddingY={6}
				bg="gray.50">
				<Box
					mb={6}
					display="flex"
					gap={4}
					flexDirection={["column", "column", "row"]}>
					<SearchBar
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search events..."
						style={{ width: "100%", maxWidth: "400px" }}
					/>
					<CategoryFilter
						categories={categories}
						selectedCategory={selectedCategory}
						onChange={setSelectedCategory}
					/>
				</Box>
				{loading ? (
					<div>Loading events...</div>
				) : error ? (
					<div style={{ color: "red" }}>Error: {error}</div>
				) : (
					<SimpleGrid
						columns={[1, 2, 3]}
						spacing={4}>
						{filteredEvents && filteredEvents.length > 0 ? (
							filteredEvents.map((event) => {
								return (
									<div key={event.id}>
										<EventItem event={{ ...event }} />
									</div>
								);
							})
						) : (
							<div>No events found.</div>
						)}
					</SimpleGrid>
				)}
			</Container>
		</Box>
	);
};
