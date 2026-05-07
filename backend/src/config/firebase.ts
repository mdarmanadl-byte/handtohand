import admin from "firebase-admin";
import { env } from "./env";
import { logger } from "../utils/logger";

let initialized = false;

export function getFirebaseApp() {
  if (!env.FCM_ENABLED) {
    return null;
  }

  if (!initialized) {
    try {
      admin.initializeApp();
      initialized = true;
    } catch (error) {
      logger.warn("Firebase admin initialization skipped", error);
    }
  }

  return initialized ? admin.app() : null;
}
