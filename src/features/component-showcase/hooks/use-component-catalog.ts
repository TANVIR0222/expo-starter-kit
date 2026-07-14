import { componentGroups } from "@/features/component-showcase/component-catalog"

export function useComponentCatalog() {
  return {
    groups: componentGroups,
    count: componentGroups.length,
  }
}
