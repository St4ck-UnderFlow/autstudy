import "@/styles/global.css"

import { StatusBar } from "expo-status-bar"
import { ToastProvider } from "@/components/Toast"

import { Profile } from "@/app/Profile"
import { SignIn } from "@/app/SignIn"

export default function App() {
  return (
    <ToastProvider position="top">
      <SignIn />
      <StatusBar style="light" />
    </ToastProvider>
  )
}
