import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAppContext } from "./AppContext";

export const CategoryFilter = ({ selectedCategory, onChange }) => {
	const { categories } = useAppContext();
	return (
		<Menu closeOnSelect={false}>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
				variant="outline"
				fontWeight="semibold"
				fontSize="sm"
				minWidth="200px"
				background="white">
				Filter by categories
			</MenuButton>
			<MenuList minWidth="200px">
				<MenuOptionGroup
					type="checkbox"
					value={selectedCategory}
					onChange={onChange}>
					{categories.map((category) => (
						<MenuItemOption
							key={category.id}
							value={String(category.id)}>
							{category.name}
						</MenuItemOption>
					))}
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	);
};
