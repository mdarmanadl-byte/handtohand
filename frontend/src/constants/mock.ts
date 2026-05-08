import type { AuthUser } from "@/types";

export const demoUser: AuthUser = {
  id: "guest-user",
  name: "Campus Guest",
  email: "guest@iitd.ac.in",
  hostelName: "Satpura",
  wing: "Demo",
  role: "STUDENT",
  coins: 144,
  karmaPoints: 18,
  rating: 4.8,
  successfulDeliveries: 12,
  successfulReturns: 6,
  cancellations: 1,
  reputationScore: 91,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
