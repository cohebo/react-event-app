import { Box, Container, Stack, Image, Heading, Text, Badge, Button } from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditEventModal } from "../components/EditEventModal";
import formatEventDateTime from "../helpers/formatEventDateTime";
import { useAppContext } from "../components/AppContext";

export const EventPage = () => {
	const { id } = useParams();
	const { events, users, categories, loading } = useAppContext();
	const event = events.find((e) => String(e.id) === String(id));
	const allCategories = categories;
	const allUsers = users;
	const eventAuthor = event && allUsers.find((u) => u.id === event.createdBy);
	const { dateString, timeString } = event ? formatEventDateTime(event.startTime, event.endTime) : { dateString: "", timeString: "" };
	const eventCategories = event && event.categoryIds ? event.categoryIds.map((catId) => allCategories.find((c) => c.id === catId)).filter(Boolean) : [];
	const [isEditOpen, setIsEditOpen] = useState(false);
	const navigate = useNavigate();

	if (loading) return <div>Loading...</div>;
	if (!event) return <div>Event niet gevonden.</div>;

	return (
		<Box bg="gray.50">
			<Container
				maxW="1200px"
				minH="100vh"
				py={6}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={6}>
					<Button
						leftIcon={<ArrowBackIcon />}
						onClick={() => window.history.back()}
						colorScheme="blue"
						variant="outline"
						borderRadius={8}>
						Back to Events
					</Button>
					<Box>
						<Button
							colorScheme="yellow"
							variant="outline"
							borderRadius={8}
							leftIcon={<EditIcon />}
							onClick={() => setIsEditOpen(true)}>
							Edit Event
						</Button>
					</Box>
				</Box>
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
								borderTopRadius={0}
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
									{eventCategories.map((cat) => (
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
				<EditEventModal
					isOpen={isEditOpen}
					onClose={() => setIsEditOpen(false)}
					event={event}
					onEventUpdated={() => {
						setIsEditOpen(false);
						navigate(`/events/${event.id}`, { replace: true });
					}}
					onEventDeleted={() => navigate("/", { replace: true })}
				/>
			</Container>
		</Box>
	);
};
