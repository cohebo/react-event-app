import { CheckboxGroup, Checkbox, Stack } from "@chakra-ui/react";
import { useAppContext } from "./AppContext";

export const CategoryFilter = ({ selectedCategory, onChange, ...props }) => {
	const { categories } = useAppContext();
	return (
		<CheckboxGroup
			colorScheme="blue"
			value={selectedCategory}
			onChange={onChange}
			{...props}>
			<Stack direction="row">
				{categories.map((category) => (
					<Checkbox
						key={category.id}
						value={String(category.id)}>
						{category.name}
					</Checkbox>
				))}
			</Stack>
		</CheckboxGroup>
	);
};
