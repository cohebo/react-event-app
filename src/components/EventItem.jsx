import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";
import { formatEventDateTime } from "./EventDateTime";

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
								<Text>{event.categoryIds}</Text>
							</>
						);
					})()}
				</Stack>
			</CardBody>
		</Card>
	);
};
