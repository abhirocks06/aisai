/** @typedef {{ id: string, date: string, title: string, time?: string, location?: string }} ClubEvent */

/** @type {ClubEvent[]} */
export const events = []

export function getEventsForDate(dateKey) {
  return events.filter((event) => event.date === dateKey)
}

export function getEventsInMonth(year, monthIndex) {
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`
  return events.filter((event) => event.date.startsWith(prefix))
}

export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
