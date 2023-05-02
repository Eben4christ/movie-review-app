import React from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
