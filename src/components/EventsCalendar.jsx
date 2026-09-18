import { useState } from 'react'
import { getEventsForDate, toDateKey } from '../data/events'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function buildMonthCells(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const startOffset = first.getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < startOffset; i += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day))
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

export default function EventsCalendar() {
  const today = startOfDay(new Date())
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(() => toDateKey(today))

  const year = cursor.getFullYear()
  const monthIndex = cursor.getMonth()
  const cells = buildMonthCells(year, monthIndex)
  const selectedEvents = getEventsForDate(selected)

  const monthLabel = cursor.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const selectedLabel = new Date(`${selected}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  function shiftMonth(delta) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
  }

  function goToday() {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelected(toDateKey(today))
  }

  return (
    <div className="animate-rise-delay grid w-full gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-medium tracking-tight text-ink">{monthLabel}</h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="inline-flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-ink"
              aria-label="Previous month"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToday}
              className="px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="inline-flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-ink"
              aria-label="Next month"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 border-t border-l border-line">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="border-b border-r border-line px-1 py-2 text-center text-xs font-medium tracking-wide text-muted uppercase"
            >
              {day}
            </div>
          ))}

          {cells.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-14 border-b border-r border-line bg-paper sm:min-h-20"
                />
              )
            }

            const key = toDateKey(date)
            const isToday = key === toDateKey(today)
            const isSelected = key === selected
            const dayEvents = getEventsForDate(key)
            const hasEvents = dayEvents.length > 0

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={[
                  'group flex min-h-14 flex-col items-start gap-1 border-b border-r border-line px-2 py-2 text-left transition-colors sm:min-h-20',
                  isSelected ? 'bg-neutral-100' : 'bg-paper hover:bg-neutral-50',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-flex h-8 w-8 items-center justify-center text-sm transition-colors',
                    isToday
                      ? 'rounded-full bg-crimson font-medium text-white'
                      : isSelected
                        ? 'font-medium text-ink'
                        : hasEvents
                          ? 'font-medium text-crimson'
                          : 'text-ink',
                  ].join(' ')}
                >
                  {date.getDate()}
                </span>
                {hasEvents && (
                  <span className="flex items-center justify-start gap-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <span
                        key={event.id}
                        className={[
                          'h-1 w-1 rounded-full',
                          isToday ? 'bg-crimson' : 'bg-crimson/70',
                        ].join(' ')}
                      />
                    ))}
                  </span>
                )}
                {hasEvents && (
                  <span className="mt-auto hidden w-full truncate text-left text-[0.65rem] leading-snug text-muted sm:block">
                    {dayEvents[0].title}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <aside className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
        <p className="text-sm text-muted">{selectedLabel}</p>
        {selectedEvents.length === 0 ? (
          <div className="mt-4">
            <p className="text-base font-medium text-ink">No events</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Nothing scheduled for this day. Join the Discord for meeting updates.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {selectedEvents.map((event) => {
              const details = [event.time, event.location].filter(Boolean).join(' · ')
              return (
                <li key={event.id} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
                  <p className="font-medium text-ink">{event.title}</p>
                  {details ? (
                    <p className="mt-1 text-sm text-muted">{details}</p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </aside>
    </div>
  )
}
