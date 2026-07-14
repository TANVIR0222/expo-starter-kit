import { toast } from "sonner-native"

type ToastOptions = {
  description?: string
}

export const appToast = {
  message(title: string, options?: ToastOptions) {
    return toast(title, options)
  },
  success(title: string, options?: ToastOptions) {
    return toast.success(title, options)
  },
  error(title: string, options?: ToastOptions) {
    return toast.error(title, options)
  },
  warning(title: string, options?: ToastOptions) {
    return toast.warning(title, options)
  },
  info(title: string, options?: ToastOptions) {
    return toast.info(title, options)
  },
  loading(title: string, options?: ToastOptions) {
    return toast.loading(title, options)
  },
  dismiss(id?: string | number) {
    return toast.dismiss(id)
  },
}
