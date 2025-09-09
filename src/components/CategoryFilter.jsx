import { CheckboxGroup, Checkbox, Stack, FormLabel, Box } from "@chakra-ui/react";
import { useAppContext } from "./AppContext";

export const CategoryFilter = ({ selectedCategory, onChange, ...props }) => {
	const { categories } = useAppContext();
	return (
		<Box>
			<FormLabel
				mb={0.5}
				fontSize="sm"
				fontWeight="semibold"
				color="gray.600">
				Filter by categories
			</FormLabel>
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
		</Box>
	);
};
