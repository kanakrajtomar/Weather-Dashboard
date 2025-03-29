import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 3; 
const TOAST_REMOVE_DELAY = 5000; 

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "REMOVE_TOAST"; toastId: string }
  | { type: "DISMISS_TOAST"; toastId?: string };

function toastReducer(state: ToasterToast[], action: ToastAction): ToasterToast[] {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast, ...state].slice(0, TOAST_LIMIT);
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.toastId);
    case "DISMISS_TOAST":
      return state.map((toast) =>
        toast.id === action.toastId ? { ...toast, open: false } : toast
      );
    default:
      return state;
  }
}

function useToast() {
  const [toasts, dispatch] = React.useReducer(toastReducer, []);

  function addToast(toast: Omit<ToasterToast, "id">) {
    const id = crypto.randomUUID();
    dispatch({ type: "ADD_TOAST", toast: { ...toast, id, open: true } });

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, TOAST_REMOVE_DELAY);
  }

  function dismissToast(toastId?: string) {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }

  return { toasts, addToast, dismissToast };
}

export { useToast };
