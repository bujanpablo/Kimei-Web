'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogOverlayProps {
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50",
      className
    )}
    initial={{ 
      backgroundColor: 'rgba(0, 0, 0, 0)',
      opacity: 0 
    }}
    animate={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      opacity: 1 
    }}
    exit={{ 
      backgroundColor: 'rgba(0, 0, 0, 0)',
      opacity: 0 
    }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "fixed right-0 top-0 z-50 h-full w-80 bg-background shadow-xl",
      className
    )}
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    style={{
      boxShadow: '-10px 0 20px rgba(0, 0, 0, 0.3)'
    }}
    {...props}
  >
    {children}
  </motion.div>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  DialogHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
))
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = React.forwardRef<
  HTMLParagraphElement,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  DialogFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
))
DialogFooter.displayName = 'DialogFooter'

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <DialogOverlay onClick={() => onOpenChange(false)} />
          {children}
        </div>
      )}
    </AnimatePresence>
  )
}

export { 
  Dialog, 
  DialogContent, 
  DialogOverlay, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
}
