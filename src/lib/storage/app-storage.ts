import AsyncStorage from "@react-native-async-storage/async-storage"

const memoryStore = new Map<string, string>()

export const appStorage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    const value = await readValue(key)

    if (!value) return fallback

    try {
      return JSON.parse(value) as T
    } catch {
      return fallback
    }
  },
  async set<T>(key: string, value: T) {
    await writeValue(key, JSON.stringify(value))
  },
  async remove(key: string) {
    memoryStore.delete(key)
    globalThis.localStorage?.removeItem(key)
    await AsyncStorage.removeItem(key)
  },
}

async function readValue(key: string) {
  return (
    globalThis.localStorage?.getItem(key) ??
    (await AsyncStorage.getItem(key)) ??
    memoryStore.get(key)
  )
}

async function writeValue(key: string, value: string) {
  memoryStore.set(key, value)
  globalThis.localStorage?.setItem(key, value)
  await AsyncStorage.setItem(key, value)
}
