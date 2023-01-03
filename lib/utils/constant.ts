import { AlertVariants } from "../../components/common/Alert";

export const SERVER_BASE_URL = `http://localhost:5001/api`;

export const ALERT_BASE: { type: AlertVariants, message: string } = { type: "", message: "" };
export const ERROR_GENERIC = "Er ging iets mis! Neem contact op met ons als dit probleem zich blijft voordoen.";

export const USER_ROLES = {
  default: 0,
  student: 2,
  teacher: 4,
  admin: 8,
  paid: 16,
};