export type Role = "STUDENT" | "ADMIN" | "MODERATOR";

export type RequestType = "CONSUMABLE" | "BORROWABLE";
export type RequestStatus =
  | "OPEN"
  | "MATCHED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "COMPLETED"
  | "EXPIRED"
  | "CANCELLED";

export type TripStatus =
  | "ANNOUNCED"
  | "MATCHING"
  | "FULL"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type ItemStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "BORROWED"
  | "MAINTENANCE";

export type BorrowTransactionStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "BORROWED"
  | "RETURNED"
  | "COMPLETED"
  | "CANCELLED";

export type NotificationType =
  | "REQUEST_MATCH"
  | "TRIP_BROADCAST"
  | "URGENT_REQUEST"
  | "GEOFENCE"
  | "COIN"
  | "BORROWABLE"
  | "SYSTEM";

export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type CoinTransactionType =
  | "EARN"
  | "SPEND"
  | "ESCROW_HOLD"
  | "ESCROW_RELEASE"
  | "REFUND"
  | "DEPOSIT";

export interface User {
  id: string;
  name: string;
  email: string;
  hostelName: string;
  wing: string;
  role: Role;
  coins: number;
  karmaPoints: number;
  rating: number;
  successfulDeliveries: number;
  successfulReturns: number;
  cancellations: number;
  reputationScore: number;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  createdAt: string;
}

export interface RequestEntity {
  id: string;
  title: string;
  description: string;
  itemName: string;
  type: RequestType;
  requesterId: string;
  helperId: string | null;
  placeId: string;
  tripId: string | null;
  status: RequestStatus;
  rewardCoins: number;
  depositCoins: number;
  isUrgent: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  title: string;
  helperId: string;
  startPlaceId: string;
  destinationLabel: string;
  departureTime: string;
  availableSlots: number;
  occupiedSlots: number;
  status: TripStatus;
  geofenceTag: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  securityDepositCoins: number;
  dailyRateCoins: number;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowTransaction {
  id: string;
  itemId: string;
  borrowerId: string;
  ownerId: string;
  status: BorrowTransactionStatus;
  depositCoins: number;
  returnDueAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  cooldownKey: string | null;
  createdAt: string;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CoinTransactionType;
  direction: "CREDIT" | "DEBIT";
  reference: string;
  description: string;
  createdAt: string;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  score: number;
  comment: string;
  requestId: string | null;
  borrowTransactionId: string | null;
  createdAt: string;
}
