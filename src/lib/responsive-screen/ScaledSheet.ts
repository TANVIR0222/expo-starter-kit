import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native"
import deepMap from "./deep-map"

type ScaleFunction = (size: number) => number
type ModerateScaleFunction = (size: number, factor?: number) => number
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

const validScaleSheetRegex =
  /^(\-?\d+(?:\.\d{1,3})?)@(mv?s(\d+(?:\.\d{1,2})?)?|s|vs)r?$/

const scaleByAnnotation =
  (
    scale: ScaleFunction,
    verticalScale: ScaleFunction,
    moderateScale: ModerateScaleFunction,
    moderateVerticalScale: ModerateScaleFunction
  ) =>
  (value: unknown): unknown => {
    if (typeof value !== "string" || !validScaleSheetRegex.test(value)) {
      return value
    }

    const regexExecResult = validScaleSheetRegex.exec(value)!

    const size = parseFloat(regexExecResult[1])
    let scaleFunc = regexExecResult[2]
    const scaleFactor = regexExecResult[3] // string or undefined

    if (scaleFactor) scaleFunc = scaleFunc.slice(0, -scaleFactor.length) // Remove the factor from it

    const shouldRound = value.endsWith("r")

    let result: number

    switch (scaleFunc) {
      case "s":
        result = scale(size)
        break
      case "vs":
        result = verticalScale(size)
        break
      case "ms":
        result = moderateScale(
          size,
          scaleFactor ? parseFloat(scaleFactor) : undefined
        )
        break
      case "mvs":
        result = moderateVerticalScale(
          size,
          scaleFactor ? parseFloat(scaleFactor) : undefined
        )
        break
      default:
        return value
    }

    return shouldRound ? Math.round(result) : result
  }

const scaledSheetCreator = (
  scale: ScaleFunction,
  verticalScale: ScaleFunction,
  moderateScale: ModerateScaleFunction,
  moderateVerticalScale: ModerateScaleFunction
) => {
  const scaleFunc = scaleByAnnotation(
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale
  )
  return {
    create: <T extends NamedStyles<T>>(styleSheet: T): T =>
      StyleSheet.create(deepMap(styleSheet, scaleFunc) as T),
  }
}

export default scaledSheetCreator
