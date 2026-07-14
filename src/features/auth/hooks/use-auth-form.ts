import { useState } from "react"

export function useAuthForm(defaultEmail = "hello@example.com") {
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState("password")

  return {
    email,
    password,
    setEmail,
    setPassword,
    isValid: email.includes("@") && password.length >= 6,
  }
}
