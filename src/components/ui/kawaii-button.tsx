import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kawaiiButtonVariants = cva(
  "kawaii-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:opacity-90",
        welcome: "bg-kawaii-pink text-white hover:bg-kawaii-purple",
        cute: "bg-kawaii-lavender text-foreground hover:bg-kawaii-pink hover:text-white",
        soft: "bg-secondary/80 text-secondary-foreground hover:bg-secondary",
        outline: "border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        success: "bg-success text-success-foreground hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface KawaiiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof kawaiiButtonVariants> {
  asChild?: boolean
}

const KawaiiButton = React.forwardRef<HTMLButtonElement, KawaiiButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(kawaiiButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
KawaiiButton.displayName = "KawaiiButton"

export { KawaiiButton, kawaiiButtonVariants }