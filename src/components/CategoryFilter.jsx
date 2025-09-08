import React from "react";
import { Select } from "@chakra-ui/react";

export const CategoryFilter = ({ categories, selectedCategory, onChange, ...props }) => (
	<Select
		placeholder="Selecteer een categorie"
		value={selectedCategory}
		onChange={onChange}
		width="100%"
		maxWidth={["100%", "50%", "380px"]}
		bg="white"
		borderRadius={8}
		{...props}>
		{categories.map((category) => (
			<option
				key={category.id}
				value={category.id}>
				{category.name}
			</option>
		))}
	</Select>
);
