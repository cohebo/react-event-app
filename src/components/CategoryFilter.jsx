import { Select } from "@chakra-ui/react";
import { useAppContext } from "./AppContext";

export const CategoryFilter = ({ selectedCategory, onChange, ...props }) => {
	const { categories } = useAppContext();
	return (
		<Select
			placeholder="Select category"
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
};
