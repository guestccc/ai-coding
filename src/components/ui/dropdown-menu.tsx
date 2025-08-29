import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    trigger: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, trigger, open, onOpenChange, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const controlled = open !== undefined
  const openState = controlled ? open : isOpen
  const setOpenState = controlled ? onOpenChange : setIsOpen

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenState?.(false)
      }
    }

    if (openState) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openState, setOpenState])

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={() => setOpenState?.(!openState)}>
        {trigger}
      </div>
      
      {openState && (
        <div
          ref={ref}
          className={cn(
            "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-border ring-opacity-5 focus:outline-none z-50",
            className
          )}
          {...props}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
})
DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuItem }
