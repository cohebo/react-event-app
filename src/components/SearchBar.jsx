import React from "react";
import { InputGroup, InputLeftElement, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ value, onChange, onSearch, placeholder = "Search..." }) => {
	return (
		<InputGroup width="100%">
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="gray.400" />
			</InputLeftElement>
			<Input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				bg="white"
				borderRadius={8}
				boxShadow="sm"
				width="100%"
				_focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299e1" }}
			/>
			{onSearch && (
				<IconButton
					aria-label="Zoek"
					icon={<SearchIcon />}
					onClick={onSearch}
					ml={2}
					colorScheme="blue"
					borderRadius="full"
				/>
			)}
		</InputGroup>
	);
};
