import React from "react";
import { Box, Container, Stack, Image, Heading, Text, Badge } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import formatEventDateTime from "../helpers/formatEventDateTime";

export const eventLoader = async ({ params }) => {
	const [eventRes, categoriesRes, usersRes] = await Promise.all([fetch(`http://localhost:3000/events/${params.id}`), fetch("http://localhost:3000/categories"), fetch("http://localhost:3000/users")]);
	if (!eventRes.ok || !categoriesRes.ok || !usersRes.ok) throw new Error("Failed to fetch data");
	const event = await eventRes.json();
	const categories = await categoriesRes.json();
	const users = await usersRes.json();
	return { ...event, categories, users };
};

export const EventPage = () => {
	const event = useLoaderData();
	const eventAuthor = event.users?.find((u) => u.id === event.createdBy);
	const { dateString, timeString } = formatEventDateTime(event.startTime, event.endTime);
	const categories = event.categoryIds.map((id) => event.categories.find((c) => c.id === id)).filter(Boolean);
	return (
		<Box bg="gray.50">
			<Container
				maxW="1200px"
				minH="100vh"
				paddingY={8}>
				<Box
					borderWidth={1}
					borderRadius="md"
					overflow="hidden"
					boxShadow="md"
					bg="white">
					<Stack
						direction="column"
						w="100%"
						spacing={0}>
						<Box
							w="100%"
							minW={0}>
							<Image
								src={event.image}
								alt={event.title}
								objectFit="cover"
								borderTopRadius={["md", 0]}
								borderLeftRadius={[0, "md"]}
								borderBottomRadius={0}
								borderRightRadius={0}
								m={0}
								display="block"
								w="100%"
								maxHeight={{ base: "300px", md: "400px", lg: "500px" }}
							/>
						</Box>
						<Box
							w="100%"
							minW={0}
							pt={6}
							pb={4}
							px={6}>
							<Stack
								spacing={3}
								w="100%">
								<Heading
									fontSize="xl"
									fontWeight="bold">
									{event.title}
								</Heading>
								<Text
									as="i"
									mb={2}>
									{event.description}
								</Text>
								<Text
									color="gray.500"
									fontSize="sm">
									Locatie: {event.location}
								</Text>
								<Text
									fontSize="sm"
									color="gray.600">
									{dateString}
								</Text>
								<Text
									fontSize="sm"
									color="gray.600">
									{timeString}
								</Text>
								<Stack
									direction="row"
									spacing={2}>
									{categories.map((cat) => (
										<Badge
											key={cat.id}
											color="blue.500"
											size="sm"
											borderRadius="full"
											px={2}
											py={1}>
											{cat.name}
										</Badge>
									))}
								</Stack>
								{eventAuthor ? (
									<Box
										display="flex"
										alignItems="center"
										mt={4}>
										<Image
											src={eventAuthor.image}
											alt={eventAuthor.name}
											boxSize="36px"
											borderRadius="full"
											mr={2}
										/>
										<Text
											fontSize="sm"
											color="gray.700">
											Gemaakt door: {eventAuthor.name}
										</Text>
									</Box>
								) : (
									<Text
										fontSize="sm"
										color="red.500"
										mt={4}>
										Author not found
									</Text>
								)}
							</Stack>
						</Box>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
};
