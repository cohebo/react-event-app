export default function formatEventDateTime(start, end) {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const dateString = startDate.toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const startTime = startDate.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	const endTime = endDate.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	return { dateString, timeString: `${startTime} – ${endTime}` };
}
