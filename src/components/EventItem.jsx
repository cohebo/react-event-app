import { Card, CardBody, Stack, Heading, Image, Text, Badge } from "@chakra-ui/react";
import formatEventDateTime from "../helpers/formatEventDateTime";

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
