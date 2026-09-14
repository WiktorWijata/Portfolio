import type { ToastVariantType } from "../../components";

export interface ToastState {
  show: boolean;
  message: string;
  variant: ToastVariantType;
}