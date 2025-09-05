import { Card, CardBody, Stack, Heading, Image, Text, Badge } from "@chakra-ui/react";
import formatEventDateTime from "../helpers/formatEventDateTime";
import { useNavigate } from "react-router-dom";

export const EventItem = ({ event }) => {
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/events/${id}`);
	};

	return (
		<Card
			variant={"outline"}
			borderRadius="md"
			overflow="hidden"
			boxShadow="md"
			h="100%"
			onClick={() => handleClick(event.id)}>
			<Image
				src={event.image}
				alt={event.title}
				objectFit="cover"
				w="100%"
				h="200px"
				borderTopRadius="md"
				borderBottomRadius={0}
				m={0}
				display="block"
			/>
			<CardBody
				pt={6}
				pb={4}
				px={6}>
				<Stack spacing={3}>
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
			</CardBody>
		</Card>
	);
};
