import { formatShortDate } from "@/utils/dates"

describe("formatShortDate", () => {
  it("formats an ISO date string to short month + day", () => {
    expect(formatShortDate("2026-07-03")).toBe("Jul 3")
  })

  it("formats a Date object correctly", () => {
    // Construct with local midnight to avoid timezone shifts
    const date = new Date("2026-01-15T00:00:00")
    expect(formatShortDate(date)).toBe("Jan 15")
  })

  it("handles end-of-year dates", () => {
    expect(formatShortDate("2026-12-31")).toBe("Dec 31")
  })

  it("handles single-digit days without zero-padding", () => {
    expect(formatShortDate("2026-03-01")).toBe("Mar 1")
  })
})
