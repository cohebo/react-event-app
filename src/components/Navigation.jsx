import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";

export const Navigation = () => (
	<Flex
		as="nav"
		bg="blue.600"
		px={4}
		h={16}
		align="center"
		gap={8}
		boxShadow="sm">
		<Link
			as={RouterLink}
			to="/"
			color="white"
			fontWeight="bold"
			_hover={{ textDecoration: "none", color: "blue.300" }}>
			EventApp
		</Link>
	</Flex>
);
