import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Box, Link, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AddEventModal } from "./AddEventModal";

export const Navigation = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const navigate = useNavigate();

	return (
		<Flex
			as="nav"
			bg="blue.600"
			boxShadow="sm"
			py={4}>
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
					fontSize="2xl"
					_hover={{ textDecoration: "none", color: "blue.300" }}>
					EventApp
				</Link>
				<Button
					bg="white"
					color="blue.600"
					fontWeight="bold"
					px={4}
					py={2}
					borderRadius="md"
					ml={4}
					_hover={{ bg: "blue.100" }}
					leftIcon={<AddIcon />}
					onClick={openModal}>
					Add Event
				</Button>
				<AddEventModal
					isOpen={isModalOpen}
					onClose={closeModal}
					handleSave={() => {
						closeModal();
						navigate("/");
					}}
				/>
			</Box>
		</Flex>
	);
};
