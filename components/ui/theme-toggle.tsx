"use client"

import { useTheme } from "next-themes"
import { useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import * as Icons from "@/components/icons/icons";



export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const switchTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      switchTheme()
    } else {
      document.startViewTransition(switchTheme)
    }
  }

  useEffect(() => {
    // Asegurarse de que el tema no sea undefined
    if (theme) {
      setTheme(theme)
    } else {
      setTheme('light') // O cualquier valor por defecto que desees
    }
  }, [theme, setTheme])
  return (
    <Button onClick={toggleTheme} variant="ghost" size="sm" className="size-10 px-0 active:scale-90 z-10">
      {theme === "light" ? (
        <Icons.Dark className="transition-all 2xl:size-7 text-muted-foreground size-8" />
      ) : (
        <Icons.Light className="transition-all 2xl:size-7 size-8" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
