import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Box, Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const Navigation = () => (
	<Flex
		as="nav"
		bg="blue.600"
		boxShadow="sm"
		py={2}>
		<Box
			maxW="1200px"
			w="100%"
			mx="auto"
			px={4}
			display="flex"
			alignItems="center"
			justifyContent="space-between">
			<Link
				as={RouterLink}
				to="/"
				color="white"
				fontWeight="bold"
				fontSize="lg"
				_hover={{ textDecoration: "none", color: "blue.300" }}>
				EventApp
			</Link>
			<Link
				as={RouterLink}
				to="/add-event"
				bg="white"
				color="blue.600"
				fontWeight="bold"
				px={4}
				py={2}
				borderRadius="md"
				ml={4}
				_hover={{ bg: "blue.100", textDecoration: "none" }}>
				<AddIcon mr={2} />
				Add Event
			</Link>
		</Box>
	</Flex>
);
