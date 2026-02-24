export default (isoDateString) => {
	const now = new Date()
	const targetDate = new Date(isoDateString)

	const diffMs = now.getTime() - targetDate.getTime()

	const isPast = diffMs >= 0
	const absoluteDiff = Math.abs(diffMs)

	const hoursTotal = Math.floor(absoluteDiff / (1000 * 60 * 60))
	const days = Math.floor(hoursTotal / 24)
	const hours = hoursTotal % 24

	return {
		isPast,
		days,
		hours,
	}
}
