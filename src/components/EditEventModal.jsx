import { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Checkbox,
	CheckboxGroup,
	Stack,
} from "@chakra-ui/react";
import { useAppContext } from "./AppContext";

export const EditEventModal = ({ isOpen, onClose, event, onEventUpdated, onEventDeleted }) => {
	const { categories, deleteEvent, updateEvent } = useAppContext();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [categoryIds, setCategoryIds] = useState([]);
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	useEffect(() => {
		if (event) {
			setTitle(event.title || "");
			setDescription(event.description || "");
			setImage(event.image || "");
			setCategoryIds(event.categoryIds ? event.categoryIds.map(String) : []);
			setLocation(event.location || "");
			if (event.startTime) {
				const d = new Date(event.startTime);
				setDate(d.toISOString().slice(0, 10));
				setStartTime(d.toTimeString().slice(0, 5));
			}
			if (event.endTime) {
				const d = new Date(event.endTime);
				setEndTime(d.toTimeString().slice(0, 5));
			}
		}
	}, [event, isOpen]);

	const handleUpdate = async () => {
		const updatedEvent = {
			...event,
			title,
			description,
			image,
			categoryIds: categoryIds.map((id) => parseInt(id)),
			location,
			startTime: date && startTime ? new Date(`${date}T${startTime}`).toISOString() : "",
			endTime: date && endTime ? new Date(`${date}T${endTime}`).toISOString() : "",
		};
		try {
			await updateEvent(updatedEvent);
			if (onEventUpdated) {
				onEventUpdated();
			} else {
				onClose();
			}
		} catch (err) {
			alert("Event update failed: " + err.message);
		}
	};

	const handleDelete = async () => {
		if (!event || !event.id) {
			alert("No valid event selected!");
			return;
		}
		if (!window.confirm("Are you sure you want to delete this event?")) return;
		try {
			await deleteEvent(event.id);
			if (onEventDeleted) onEventDeleted();
			onClose();
		} catch (err) {
			alert("Event deletion failed: " + err.message);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Event Title</FormLabel>
						<Input
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
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Event Image URL</FormLabel>
						<Input
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Categories</FormLabel>
						<CheckboxGroup
							colorScheme="blue"
							value={categoryIds}
							onChange={(values) => setCategoryIds(values)}>
							<Stack direction="column">
								{categories.map((cat) => (
									<Checkbox
										key={cat.id}
										value={String(cat.id)}>
										{cat.name}
									</Checkbox>
								))}
							</Stack>
						</CheckboxGroup>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Location</FormLabel>
						<Input
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</FormControl>
					<Button
						colorScheme="red"
						variant="outline"
						onClick={handleDelete}
						mt={6}
						width="100%">
						Delete Event
					</Button>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="ghost"
						onClick={onClose}
						mr={3}>
						Cancel
					</Button>
					<Button
						colorScheme="blue"
						onClick={handleUpdate}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
