import { Toaster, toast as sonnerToast, type ToasterProps } from "sonner"
import { useTheme } from "next-themes"
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Loader2 } from "lucide-react"

// Toaster component
const AppToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Toaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            group toast
            w-full flex items-center gap-3
            p-4 rounded-lg border
            bg-background border-border
            shadow-lg
          `,
          title: "font-medium",
          description: "text-muted-foreground text-sm",
          actionButton: `
            bg-primary text-primary-foreground
            hover:bg-primary/90
            px-3 py-1 text-sm rounded-md
          `,
          cancelButton: `
            bg-muted text-muted-foreground
            hover:bg-muted/80
            px-3 py-1 text-sm rounded-md
          `,
          success: `
            bg-success-bg text-black
          `,
          error: `
            text-danger border-destructive/20
          `,
          warning: `
            bg-warning/10 text-warning-foreground
            border-warning/20
          `,
          info: `
            bg-info/10 text-info-foreground
            border-info/20
          `,
          loading: `
            bg-muted text-muted-foreground
            border-border
          `,
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-success" />,
        error: <AlertCircle className="h-5 w-5 text-danger" />,
        warning: <AlertTriangle className="h-5 w-5 text-warning" />,
        info: <Info className="h-5 w-5 text-info" />,
        loading: <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />,
      }}
      {...props}
    />
  )
}

// Custom toast functions
const toast = {
  success: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    sonnerToast.success(message, {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      ...options
    })
  },
  error: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    sonnerToast.error(message, {
      icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      ...options
    })
  },
  warning: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    sonnerToast.warning(message, {
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      ...options
    })
  },
  info: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    sonnerToast.info(message, {
      icon: <Info className="h-5 w-5 text-info" />,
      ...options
    })
  },
  loading: (message: string, options?: Parameters<typeof sonnerToast>[1]) => {
    sonnerToast.loading(message, {
      icon: <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />,
      ...options
    })
  },
}

export { AppToaster, toast }
