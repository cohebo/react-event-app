import { useState } from "react";
import { useAppContext } from "./AppContext";
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
	Select,
	Textarea,
	FormErrorMessage,
	Checkbox,
	CheckboxGroup,
	Stack,
	useToast,
} from "@chakra-ui/react";

export const AddEventModal = ({ isOpen, onClose, handleSave }) => {
	const { users, categories, addEvent } = useAppContext();
	const toast = useToast();
	const [submitted, setSubmitted] = useState(false);
	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [categoryIds, setCategoryIds] = useState([]);
	const [authorId, setAuthorId] = useState("");

	const onSave = async () => {
		setSubmitted(true);
		const missing = {
			image: !image,
			title: !title,
			description: !description,
			location: !location,
			date: !date,
			startTime: !startTime,
			endTime: !endTime,
			categoryIds: !categoryIds.length,
			authorId: !authorId,
		};
		if (Object.values(missing).some(Boolean)) {
			return;
		}

		const newEvent = {
			image,
			title,
			description,
			location,
			categoryIds: categoryIds.map((id) => parseInt(id)),
			createdBy: parseInt(authorId),
			startTime: date && startTime ? new Date(`${date}T${startTime}`).toISOString() : "",
			endTime: date && endTime ? new Date(`${date}T${endTime}`).toISOString() : "",
		};

		try {
			await addEvent(newEvent);
			toast({
				title: "Event created.",
				description: "The event was successfully created.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setImage("");
			setTitle("");
			setDescription("");
			setLocation("");
			setDate("");
			setStartTime("");
			setEndTime("");
			setCategoryIds([]);
			setAuthorId("");
			setSubmitted(false);
			onClose();
			if (handleSave) handleSave();
		} catch (err) {
			toast({
				title: "Event creation failed.",
				description: err.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add New Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !title}>
						<FormLabel>Event Title</FormLabel>
						<Input
							placeholder="Enter event title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !description}>
						<FormLabel>Event Description</FormLabel>
						<Textarea
							placeholder="Enter event description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !image}>
						<FormLabel>Event Image URL</FormLabel>
						<Input
							placeholder="Enter image URL"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>

					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !location}>
						<FormLabel>Location</FormLabel>
						<Input
							placeholder="Enter location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !date}>
						<FormLabel>Event Date</FormLabel>
						<Input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !startTime}>
						<FormLabel>Event start time</FormLabel>
						<Input
							type="time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !endTime}>
						<FormLabel>Event end time</FormLabel>
						<Input
							type="time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !categoryIds.length}>
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
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
					<FormControl
						mt={4}
						isRequired
						isInvalid={submitted && !authorId}>
						<FormLabel>Author</FormLabel>
						<Select
							placeholder="Select author"
							value={authorId}
							onChange={(e) => setAuthorId(e.target.value)}>
							<option
								value=""
								disabled
								hidden>
								Select author
							</option>
							{users.map((user) => (
								<option
									key={user.id}
									value={user.id}>
									{user.name}
								</option>
							))}
						</Select>
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="ghost"
						mr={3}
						onClick={onClose}>
						Close
					</Button>
					<Button
						colorScheme="blue"
						onClick={onSave}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
