import * as React from "react"
import { cn } from "@/lib/utils"

const KawaiiCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("kawaii-card p-6", className)}
    {...props}
  />
))
KawaiiCard.displayName = "KawaiiCard"

const KawaiiCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
KawaiiCardHeader.displayName = "KawaiiCardHeader"

const KawaiiCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight gradient-text", className)}
    {...props}
  />
))
KawaiiCardTitle.displayName = "KawaiiCardTitle"

const KawaiiCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
KawaiiCardDescription.displayName = "KawaiiCardDescription"

const KawaiiCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
KawaiiCardContent.displayName = "KawaiiCardContent"

const KawaiiCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
KawaiiCardFooter.displayName = "KawaiiCardFooter"

export { KawaiiCard, KawaiiCardHeader, KawaiiCardFooter, KawaiiCardTitle, KawaiiCardDescription, KawaiiCardContent }