import { runtimeConfig } from "@/config/runtime-config"
import {
  notificationContent,
  type NotificationTemplate,
} from "@/lib/notifications/notification-content"
import { createId } from "@/utils/ids"

export async function scheduleNotification(
  template: NotificationTemplate,
  scheduledFor: Date
) {
  if (!runtimeConfig.featureFlags.enableNotifications) return null

  const content = notificationContent[template]
  console.info("[notification]", content.title, content.body)

  return {
    id: createId(template),
    scheduledFor: scheduledFor.toISOString(),
    template,
  }
}
