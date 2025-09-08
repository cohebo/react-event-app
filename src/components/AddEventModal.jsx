import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, Select } from "@chakra-ui/react";

export const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
	// States voor alle event-velden
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const handleSave = async () => {
		const newEvent = {
			title,
			description,
			image,
			categoryIds: categoryId ? [parseInt(categoryId)] : [],
			location,
			startTime: date && startTime ? new Date(`${date}T${startTime}`).toISOString() : "",
			endTime: date && endTime ? new Date(`${date}T${endTime}`).toISOString() : "",
		};

		try {
			const response = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEvent),
			});
			if (!response.ok) throw new Error("Fout bij opslaan event");
			if (onEventAdded) onEventAdded();
			onClose();
		} catch (err) {
			alert("Event opslaan mislukt: " + err.message);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Event Title</FormLabel>
						<Input
							placeholder="Enter event title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Event Date</FormLabel>
						<Input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
						<FormLabel mt={2}>Event start time</FormLabel>
						<Input
							type="time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
						<FormLabel mt={2}>Event end time</FormLabel>
						<Input
							type="time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Event Description</FormLabel>
						<Textarea
							placeholder="Enter event description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Event Image URL</FormLabel>
						<Input
							placeholder="Enter image URL (optioneel)"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Category</FormLabel>
						<Select
							placeholder="Select category"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}>
							<option value="1">sports</option>
							<option value="2">games</option>
							<option value="3">relaxation</option>
						</Select>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Location</FormLabel>
						<Input
							placeholder="Enter location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={onClose}>
						Sluiten
					</Button>
					<Button
						variant="ghost"
						onClick={handleSave}>
						Opslaan
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
