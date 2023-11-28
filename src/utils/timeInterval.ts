const timeInterval: { label: string; value: string }[] = []

for (let hour = 9; hour < 22; hour++) {
	const startTime = hour.toString().padStart(2, '0') + ':00'
	const endTime = (hour + 1).toString().padStart(2, '0') + ':00'

	timeInterval.push({
		label: `${startTime} - ${endTime}`,
		value: `${startTime} - ${endTime}`
	})
}

export default timeInterval
