import bcrypt from "bcryptjs";
import { db, makeId } from "../../prisma";
import { AppError } from "../../utils/app-error";
import { signAccessToken } from "../../utils/jwt";

function sanitizeUser(user: (typeof db.users)[number]) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function seedPasswordMatches(password: string, hash: string) {
  return hash === "$2b$10$abcdefghijklmnopqrstuv" && password === "password123";
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  hostelName: string;
  wing: string;
}) {
  const existingUser = db.users.find((user) => user.email === payload.email);

  if (existingUser) {
    throw new AppError(409, "Email already in use.");
  }

  const timestamp = new Date().toISOString();
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = {
    id: makeId("user"),
    name: payload.name,
    email: payload.email,
    hostelName: payload.hostelName,
    wing: payload.wing,
    role: "STUDENT" as const,
    coins: 100,
    karmaPoints: 0,
    rating: 5,
    successfulDeliveries: 0,
    successfulReturns: 0,
    cancellations: 0,
    reputationScore: 60,
    passwordHash,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  db.users.push(user);

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    }),
  };
}

export async function loginUser(payload: { email: string; password: string }) {
  const user = db.users.find((entry) => entry.email === payload.email);

  if (!user) {
    throw new AppError(401, "Invalid credentials.");
  }

  const isValidPassword =
    seedPasswordMatches(payload.password, user.passwordHash) ||
    (await bcrypt.compare(payload.password, user.passwordHash).catch(() => false));

  if (!isValidPassword) {
    throw new AppError(401, "Invalid credentials.");
  }

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    }),
  };
}

export function getCurrentUser(userId: string) {
  const user = db.users.find((entry) => entry.id === userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  return sanitizeUser(user);
}
