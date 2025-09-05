import React from "react";
import { Box, Container, Stack, Image, Heading, Text, Badge, AspectRatio } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import formatEventDateTime from "../helpers/formatEventDateTime";

export const eventLoader = async ({ params }) => {
	const [eventRes, categoriesRes] = await Promise.all([fetch(`http://localhost:3000/events/${params.id}`), fetch("http://localhost:3000/categories")]);
	if (!eventRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");
	const event = await eventRes.json();
	const categories = await categoriesRes.json();
	return { ...event, categories };
};

export const EventPage = () => {
	const event = useLoaderData();
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
					h="100%"
					bg="white">
					<Stack
						direction={["column", "row"]}
						w="100%"
						h={["auto", "500px"]}>
						<Box
							w={["100%", "50%"]}
							minW={0}>
							<AspectRatio
								ratio={1}
								w="100%"
								h={["200px", "100%"]}>
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
								/>
							</AspectRatio>
						</Box>
						<Box
							w={["100%", "50%"]}
							h={["auto", "100%"]}
							minW={0}
							pt={6}
							pb={4}
							px={6}
							display="flex"
							alignItems="flex-start"
							justifyContent="center">
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
									Location: {event.location}
								</Text>
								{(() => {
									const { dateString, timeString } = formatEventDateTime(event.startTime, event.endTime);
									return (
										<>
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
										</>
									);
								})()}
								<Stack
									direction="row"
									spacing={2}>
									{event.categoryIds.map(
										(id) =>
											event.categories.find((category) => category.id === id) && (
												<Badge
													key={id}
													color="blue.500"
													size="sm"
													borderRadius="full"
													px={2}
													py={1}>
													{event.categories.find((category) => category.id === id).name}
												</Badge>
											)
									)}
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
};
