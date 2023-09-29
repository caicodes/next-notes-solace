import React from "react"
import { ModeToggle } from "./ModeToggle"

export const AppHeader = () => {
  return (
    <div className="flex justify-between">
      <div>AppHeader</div>
      <ModeToggle />
    </div>
  )
}
