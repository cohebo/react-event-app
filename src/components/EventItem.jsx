import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";
import formatEventDateTime from "../helpers/formatEventDateTime";
import { useNavigate } from "react-router-dom";
import { CategoryBadges } from "./CategoryBadges";

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
			cursor="pointer"
			transition="all 0.2s ease-in-out"
			_hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "blue.300" }}
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
					<CategoryBadges categoryIds={event.categoryIds} />
				</Stack>
			</CardBody>
		</Card>
	);
};
