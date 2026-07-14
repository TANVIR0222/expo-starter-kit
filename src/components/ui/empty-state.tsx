import { AppText } from "@/components/ui/app-text"
import { Card } from "@/components/ui/card"

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <AppText variant="subtitle">{title}</AppText>
      <AppText tone="muted">{body}</AppText>
    </Card>
  )
}
