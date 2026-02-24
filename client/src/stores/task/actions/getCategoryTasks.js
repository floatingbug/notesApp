export default function getCategoryTasks(category) {
	return this.categories[category].ids.map((id) => this.itemsById[id])
}
