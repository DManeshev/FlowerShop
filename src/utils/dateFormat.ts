export const dateFormat = (value: string) => {
	const date = new Date(value)
	const year = date.getFullYear()
	const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
	const month =
		date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
	const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
	const minutes =
		date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`

	const currentDate = `${month}.${day}.${year}`

	return currentDate
}
