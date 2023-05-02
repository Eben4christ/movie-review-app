import { useContext } from "react"
import { NotificationContext } from "../context/NotificationProvider"
import { ThemeContext } from "../context/ThemeProvider"
import { AuthContext } from "../context/AuthProvider"

export const useTheme = () => useContext(ThemeContext)
export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)