import { en } from "@/i18n/translations/en"
import { es } from "@/i18n/translations/es"

describe("Translation dictionaries", () => {
  it("Spanish dictionary has the same top-level sections as English", () => {
    const englishSections = Object.keys(en)
    const spanishSections = Object.keys(es)
    expect(spanishSections).toEqual(englishSections)
  })

  it("Spanish dictionary has the same keys as English within each section", () => {
    for (const section of Object.keys(en) as (keyof typeof en)[]) {
      const enKeys = Object.keys(en[section])
      const esKeys = Object.keys(es[section])
      expect(esKeys).toEqual(enKeys)
    }
  })

  it("English dictionary has no empty string values", () => {
    for (const section of Object.keys(en) as (keyof typeof en)[]) {
      for (const [key, value] of Object.entries(en[section])) {
        // Jest 29: expect() takes only one arg — embed context in the value
        expect({ key: `en.${section}.${key}`, isEmpty: value === "" }).toEqual({
          key: `en.${section}.${key}`,
          isEmpty: false,
        })
      }
    }
  })
})
