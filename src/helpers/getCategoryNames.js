// Geeft een string met categorienamen op basis van ids en een lijst met categorie-objecten
export default function getCategoryNames(categoryIds = [], categories = []) {
  return categoryIds
    .map(id => {
      const match = categories.find(category => String(category.id) === String(id));
      return match ? match.name : null;
    })
    .filter(Boolean)
    .join(", ");
}
