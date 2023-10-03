import AppLogo from "./AppLogo"
import { ModeToggle } from "./ModeToggle"

export const AppHeader = () => {
  return (
    <div className="flex justify-between p-4 bg-slate-300/50 dark:bg-slate-900/20 place-items-center">
      <AppLogo />
      <ModeToggle />
    </div>
  )
}
