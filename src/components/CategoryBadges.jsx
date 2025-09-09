import { useAppContext } from "./AppContext";
import { Wrap, Badge } from "@chakra-ui/react";

export const CategoryBadges = ({ categoryIds }) => {
	const { categories } = useAppContext();
	if (!Array.isArray(categoryIds) || categoryIds.length === 0) return null;
	return (
		<Wrap
			direction="row"
			spacing={2}>
			{categoryIds.map((id) => {
				const category = categories.find((category) => String(category.id) === String(id));
				return category ? (
					<Badge
						key={id}
						colorScheme="blue"
						variant="subtle"
						size={"sm"}
						px={2}
						py={1}
						borderRadius="full">
						{category.name}
					</Badge>
				) : null;
			})}
		</Wrap>
	);
};
