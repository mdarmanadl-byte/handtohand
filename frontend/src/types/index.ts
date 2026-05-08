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

export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type NotificationType =
  | "REQUEST_MATCH"
  | "TRIP_BROADCAST"
  | "URGENT_REQUEST"
  | "GEOFENCE"
  | "COIN"
  | "BORROWABLE"
  | "SYSTEM";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  hostelName: string;
  wing: string;
  role: "STUDENT" | "ADMIN" | "MODERATOR";
  coins: number;
  karmaPoints: number;
  rating: number;
  successfulDeliveries: number;
  successfulReturns: number;
  cancellations: number;
  reputationScore: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Place = {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
};

export type RequestItem = {
  id: string;
  requesterId: string;
  helperId: string | null;
  tripId: string | null;
  title: string;
  description: string;
  itemName: string;
  type: RequestType;
  placeId: string;
  status: RequestStatus;
  rewardCoins: number;
  depositCoins: number;
  isUrgent: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Trip = {
  id: string;
  helperId: string;
  title: string;
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
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  cooldownKey: string | null;
  createdAt: string;
};

export type Rating = {
  id: string;
  fromUserId: string;
  toUserId: string;
  score: number;
  comment: string;
  requestId: string | null;
  borrowTransactionId: string | null;
  createdAt: string;
};
