export type NotificationTemplate = "dailyDigest" | "starterReminder"

export const notificationContent: Record<
  NotificationTemplate,
  { title: string; body: string }
> = {
  dailyDigest: {
    title: "Your starter digest is ready",
    body: "Review your settings, components, and project structure.",
  },
  starterReminder: {
    title: "Review your starter setup",
    body: "Replace the example modules with your first product feature.",
  },
}
