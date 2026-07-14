import { useEffect, useState } from "react"
import { Dimensions, PixelRatio, ScaledSize } from "react-native"

let screenWidth: number = Dimensions.get("window").width
let screenHeight: number = Dimensions.get("window").height

const useDynamicWidth = (widthPercent: number | string): number => {
  const elemWidth: number =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

const useDynamicHeight = (heightPercent: number | string): number => {
  const elemHeight: number =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

type Orientation = "portrait" | "landscape"

const useOrientationChange = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(
    screenWidth < screenHeight ? "portrait" : "landscape"
  )

  useEffect(() => {
    const updateOrientation = (newDimensions: { window: ScaledSize }): void => {
      screenWidth = newDimensions.window.width
      screenHeight = newDimensions.window.height

      setOrientation(screenWidth < screenHeight ? "portrait" : "landscape")
    }

    Dimensions.addEventListener("change", updateOrientation)

    return () => {
      //   Dimensions.removeEventListener('change', updateOrientation); remove the bug
    }
  }, [])

  return orientation
}

export { useDynamicHeight, useDynamicWidth, useOrientationChange }
