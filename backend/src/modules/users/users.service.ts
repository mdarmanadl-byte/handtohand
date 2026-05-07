import { db } from "../../prisma";
import { AppError } from "../../utils/app-error";

export function listUsers() {
  return db.users.map(({ passwordHash, ...user }) => user);
}

export function getUserProfile(userId: string) {
  const user = db.users.find((entry) => entry.id === userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  const { passwordHash, ...profile } = user;
  return profile;
}
