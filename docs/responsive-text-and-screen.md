# Responsive Screen Utilities

`src/lib/responsive-screen/` — Screen size-aware scaling helpers for React Native.

এই লাইব্রেরি নিশ্চিত করে যে UI elements ভিন্ন ভিন্ন screen size-এ সঠিকভাবে scale হয় এবং orientation পরিবর্তনে ঠিকমতো কাজ করে।

---

## ফাইল পরিচিতি

```
src/lib/responsive-screen/
├── scaling-utils.ts     Scale functions (scale, verticalScale, moderateScale)
├── orientationscale.ts  Orientation hook + dynamic dimension hooks
├── deep-map.ts          Internal utility (সরাসরি ব্যবহার করবেন না)
└── ScaledSheet.ts       StyleSheet wrapper with annotation-based auto-scaling
```

---

## `scaling-utils.ts` — Scale Functions

> **সবচেয়ে বেশি ব্যবহৃত ফাইল।** Text size, padding, margin, width, height সব কিছু screen অনুযায়ী scale করতে ব্যবহার হয়।

### কীভাবে কাজ করে

একটি **guideline base size** (350×680) ধরে নেওয়া হয়। Device-এর actual size-এর সাথে তুলনা করে proportional scale বের করা হয়।

```
scale factor = device dimension / guideline dimension
```

### Functions

| Function | Alias | কাজ | কখন ব্যবহার করবেন |
|---|---|---|---|
| `scale(size)` | `s` | Horizontal scaling | `width`, `paddingHorizontal`, `marginHorizontal` |
| `verticalScale(size)` | `vs` | Vertical scaling | `height`, `paddingVertical`, `marginVertical` |
| `moderateScale(size, factor?)` | `ms` | Mixed scaling (default factor: 0.5) | **Font size**, `borderRadius`, icon size |
| `moderateVerticalScale(size, factor?)` | `mvs` | Vertical moderate scaling | Vertical padding যখন extreme scale চান না |

> **Rule:** Text এ সবসময় `moderateScale()` ব্যবহার করুন। Pure width/height এ `scale()` / `verticalScale()` ব্যবহার করুন।

### ব্যবহারের উদাহরণ

```ts
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  s, vs, ms, mvs, // Short aliases
} from "@/lib/responsive-screen/scaling-utils"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),       // horizontal spacing
    paddingVertical: verticalScale(24), // vertical spacing
  },
  title: {
    fontSize: moderateScale(24),        // ✅ font size-এ সবসময় moderateScale
    lineHeight: moderateScale(32),
  },
  button: {
    width: scale(200),
    height: verticalScale(48),
    borderRadius: moderateScale(8),
  },
  icon: {
    width: ms(24),                      // alias ব্যবহার করা যায়
    height: ms(24),
  },
})
```

### `factor` কী?

`moderateScale(size, factor)` এ `factor` নির্ধারণ করে কতটুকু scale হবে:

```ts
moderateScale(16, 0)    // কোনো scale নেই — সবসময় 16
moderateScale(16, 0.5)  // মাঝামাঝি scale (default)
moderateScale(16, 1)    // পুরোপুরি scale — scale(16) এর সমান
```

ছোট screen-এ বড় font চাইলে factor কমান।

---

## `orientationscale.ts` — Orientation & Dynamic Dimensions

### Hooks

#### `useOrientationChange()`

Current orientation (`"portrait"` বা `"landscape"`) return করে এবং orientation পরিবর্তন হলে re-render trigger করে।

```ts
import { useOrientationChange } from "@/lib/responsive-screen/orientationscale"

const MyComponent = () => {
  const orientation = useOrientationChange() // "portrait" | "landscape"

  return (
    <View style={orientation === "landscape" ? styles.landscape : styles.portrait}>
      <Text>Current: {orientation}</Text>
    </View>
  )
}
```

**কখন ব্যবহার করবেন:**
- Layout landscape-এ ভিন্নভাবে সাজাতে চাইলে
- Orientation-based conditional styling লাগলে

---

#### `useDynamicWidth(widthPercent)`

Screen width-এর একটি নির্দিষ্ট percentage pixel-এ return করে।

```ts
import { useDynamicWidth } from "@/lib/responsive-screen/orientationscale"

// Screen-এর ৮০% width (pixels এ)
const boxWidth = useDynamicWidth(80)
const halfScreen = useDynamicWidth("50%") // string-ও দেওয়া যায়
```

---

#### `useDynamicHeight(heightPercent)`

Screen height-এর একটি নির্দিষ্ট percentage pixel-এ return করে।

```ts
import { useDynamicHeight } from "@/lib/responsive-screen/orientationscale"

// Screen-এর ৩০% height (pixels এ)
const sectionHeight = useDynamicHeight(30)
```

**কখন ব্যবহার করবেন:**
- Full-screen modal বা hero section তৈরি করতে
- Screen percentage-based layout লাগলে (Flexbox দিয়ে না হলে)

---

## `ScaledSheet.ts` — Annotation-Based Auto Scaling

> **সবচেয়ে elegant পদ্ধতি।** Style value-এর সাথে annotation যোগ করলে automatically scale হয়ে যায় — আলাদা করে function call করতে হয় না।

### কীভাবে import করবেন

```ts
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "@/lib/responsive-screen/scaling-utils"
import scaledSheetCreator from "@/lib/responsive-screen/ScaledSheet"

const ScaledSheet = scaledSheetCreator(
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale
)
```

### Annotation Syntax

Value-এর শেষে `@` দিয়ে scale type লিখুন:

| Annotation | মানে | সমতুল্য |
|---|---|---|
| `"16@s"` | `scale(16)` | Horizontal scale |
| `"24@vs"` | `verticalScale(24)` | Vertical scale |
| `"14@ms"` | `moderateScale(14)` | Moderate scale (factor: 0.5) |
| `"14@ms0.3"` | `moderateScale(14, 0.3)` | Custom factor |
| `"14@mvs"` | `moderateVerticalScale(14)` | Moderate vertical |
| `"16@sr"` | `Math.round(scale(16))` | `r` suffix → round করা হয় |

### ব্যবহারের উদাহরণ

```ts
const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@s",      // scale(16)
    paddingVertical: "24@vs",       // verticalScale(24)
  },
  title: {
    fontSize: "20@ms",              // moderateScale(20)
    lineHeight: "28@ms",
  },
  button: {
    width: "200@s",
    height: "48@vs",
    borderRadius: "8@ms",
  },
  icon: {
    width: "24@ms0.3",             // moderateScale(24, 0.3)
    height: "24@ms0.3",
  },
})
```

> **Note:** Annotation ছাড়া normal value (যেমন `padding: 16`) হলে সেটা scale হবে না — তেমনই থাকবে।

---

## `deep-map.ts` — Internal Utility

এটি **সরাসরি ব্যবহার করবেন না।** এটি `ScaledSheet` internally ব্যবহার করে nested style object-এর সব string value parse করে scale করতে।

---

## Real-World Example

### পদ্ধতি ১ — `scaling-utils` সরাসরি

```ts
import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "@/lib/responsive-screen/scaling-utils"
import { useOrientationChange } from "@/lib/responsive-screen/orientationscale"

export const ProfileCard = () => {
  const orientation = useOrientationChange()

  return (
    <View style={[styles.card, orientation === "landscape" && styles.cardLandscape]}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Software Engineer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(8),
  },
  cardLandscape: {
    flexDirection: "row",
    paddingHorizontal: scale(24),
  },
  name: {
    fontSize: moderateScale(20),  // ✅ moderateScale for font
    fontWeight: "600",
  },
  bio: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(4),
  },
})
```

### পদ্ধতি ২ — `ScaledSheet` annotation দিয়ে (cleaner)

```ts
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "@/lib/responsive-screen/scaling-utils"
import scaledSheetCreator from "@/lib/responsive-screen/ScaledSheet"
import { useOrientationChange } from "@/lib/responsive-screen/orientationscale"

const ScaledSheet = scaledSheetCreator(scale, verticalScale, moderateScale, moderateVerticalScale)

export const ProfileCard = () => {
  const orientation = useOrientationChange()

  return (
    <View style={[styles.card, orientation === "landscape" && styles.cardLandscape]}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Software Engineer</Text>
    </View>
  )
}

const styles = ScaledSheet.create({
  card: {
    padding: "16@s",
    borderRadius: "12@ms",
    marginVertical: "8@vs",
  },
  cardLandscape: {
    flexDirection: "row",
    paddingHorizontal: "24@s",
  },
  name: {
    fontSize: "20@ms",   // ✅ annotation দিয়ে moderateScale
    fontWeight: "600",
  },
  bio: {
    fontSize: "14@ms",
    marginTop: "4@vs",
  },
})
```

---

## Quick Reference — কোনটা কখন?

| পরিস্থিতি | ব্যবহার করুন |
|---|---|
| Font size, icon size, border radius | `moderateScale(size)` বা `"size@ms"` |
| Width, horizontal padding/margin | `scale(size)` বা `"size@s"` |
| Height, vertical padding/margin | `verticalScale(size)` বা `"size@vs"` |
| Annotation-based auto scaling চাই | `ScaledSheet.create({...})` |
| Screen-এর % width দরকার | `useDynamicWidth(percent)` |
| Screen-এর % height দরকার | `useDynamicHeight(percent)` |
| Portrait/Landscape layout ভিন্ন | `useOrientationChange()` |

---

## সংক্ষিপ্ত Aliases

```ts
import { s, vs, ms, mvs } from "@/lib/responsive-screen/scaling-utils"

// s  → scale
// vs → verticalScale
// ms → moderateScale
// mvs → moderateVerticalScale

fontSize: ms(16)   // moderateScale(16) এর মতোই
width: s(100)      // scale(100) এর মতোই
```
