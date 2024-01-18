export const timeDeliveryArray: { name: string; id: string }[] = []

for (let hour = 9; hour < 22; hour++) {
	const startTime = hour.toString().padStart(2, '0') + ':00'
	const endTime = (hour + 1).toString().padStart(2, '0') + ':00'

	timeDeliveryArray.push({
		id: `${startTime} - ${endTime}`,
		name: `${startTime} - ${endTime}`
	})
}
