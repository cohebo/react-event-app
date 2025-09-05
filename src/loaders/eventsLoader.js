// Loader functie voor het ophalen van events
export async function eventsLoader() {
	const response = await fetch("http://localhost:3000/events");
	if (!response.ok) {
		throw new Error("Events konden niet worden opgehaald");
	}
	return response.json();
}
