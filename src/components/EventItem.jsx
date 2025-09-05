import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";
import EventDateTime from "./EventDateTime";

export const EventItem = ({ event }) => {
	return (
		<Card
			variant={"outline"}
			borderRadius="md"
			overflow="hidden"
			boxShadow="md">
			<CardBody>
				<Image
					src={event.image}
					alt={event.title}
					objectFit="cover"
					w="100%"
					borderRadius={"md"}
				/>
				<Stack
					mt={6}
					spacing={3}>
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
					<Text
						fontSize="sm"
						color="gray.600">
						<EventDateTime
							start={event.startTime}
							end={event.endTime}
						/>
					</Text>
				</Stack>
			</CardBody>
		</Card>
	);
};
