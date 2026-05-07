```txt


Building a production-level campus peer-to-peer assistance platform called “HandToHand” for IIT Delhi students.

The platform is a decentralized student-powered campus logistics and sharing network where students help each other with deliveries, errands, and borrowable items 
The system should focus on:
- real-world scalability
- modular backend architecture
- realtime notifications
- geofence-based matching
- trust systems
- coin economy
- smart campus logistics

==================================================
CORE CONCEPT
==================================================

Students frequently move around campus:
- Night Mess
- Nescafe
- SDA Market
- Stationery Shops
- Medical Stores
- Banks
- Hospitals

Instead of dedicated delivery agents, the app uses existing student movement.

If a student is already going somewhere:
- they can pick up requests
- deliver consumables
- lend items
- earn coins

Coins can later be used to request help from others.

==================================================
MAIN SYSTEMS
==================================================

# 1. Consumables System

One-time delivery requests.

Examples:
- food
- coffee
- snacks
- medicines
- stationery

Flow:
1. User creates request
2. Nearby/helper users receive notifications
3. User accepts request
4. Delivery completed
5. Coins transferred automatically

==================================================

# 2. Borrowables System

Temporary item lending between students.

Examples:
- cycle
- umbrella
- calculator
- charger
- books
- sports equipment

Flow:
1. User requests item
2. Owner accepts request
3. Item borrowed temporarily
4. Item returned
5. Coins + reputation updated

Borrowables may require refundable security deposits.

==================================================

# 3. Intentional Trip Broadcasting

Users can intentionally announce trips.

Example:
“Going from Satpura Hostel → Night Mess in 10 mins. Can carry 3 orders.”

The system should:
- notify matching users
- attach requests to trips
- support multiple requests per trip
- manage slot limits

==================================================

# 4. Geofence-Based Matching

The app should detect when a user enters important places.

Examples:
- Night Mess
- Nescafe
- SDA
- Medical Store

When a user enters a geofence:
- backend checks nearby pending requests
- sends contextual notifications

Example:
“You are near Night Mess. 3 requests available.”

DO NOT use continuous Uber-style tracking.
Use event-driven geofence entry detection.

==================================================

# 5. Urgent Requests

Support urgent requests:
- medicine
- emergency stationery
- exam calculator

Urgent requests:
- pay higher coin rewards
- send higher priority notifications
- broadcast wider

==================================================
COIN ECONOMY
==================================================

Users earn coins by:
- deliveries
- lending items
- urgent help

Users spend coins by:
- requesting deliveries
- borrowing items
- urgent broadcasts

Support:
- coin transactions
- deposits
- refunds
- escrow-like holding

==================================================
TRUST SYSTEM
==================================================

Each user should have:
- rating
- successful deliveries
- successful returns
- cancellation rate
- reputation score

Use IIT Delhi email verification:
@iitd.ac.in

==================================================
TECH STACK
==================================================

Frontend:
- next js
- Tailwind 
Backend:
- Node.js
- Express.js 

Database:
- PostgreSQL
- Prisma ORM
- mango db

Realtime:
- Socket.IO

Cache & Matching:
- Redis
- Redis GEOSEARCH

Notifications:
- Firebase Cloud Messaging (FCM)

Background Jobs:
- BullMQ

Authentication:
- JWT
- Google OAuth

==================================================
BACKEND REQUIREMENTS
==================================================

Build clean modular architecture.

Suggested structure:

src/
 ├── modules/
 ├─ auth/
 ├── requests/
 ├── trips/
 ├── borrowables/
 ├── notifications/
 ├── matching/
 ├── coins/
 ├── sockets/
 ├── prisma/
 ├── middleware/
 ├── utils/
 |__ env

==================================================
REQUIRED FEATURES
==================================================

Implement:
- JWT authentication
- role-based middleware
- Prisma schema
- PostgreSQL relations
- realtime Socket.IO updates
- Redis caching
- BullMQ queues
- push notifications
- geofence event handling
- trip broadcasting
- coin transactions
- ratings system
- notification prioritization
- request expiration
- trip slot management
- borrowable item lifecycle

==================================================
DATABASE MODELS
==================================================

Users
Places
Requests
Trips
TripRequests
Items
BorrowTransactions
Notifications
CoinTransactions
Ratings

==================================================
API REQUIREMENTS
==================================================

Create production-level REST APIs for:
- auth
- requests
- trips
- notifications
- borrowables
- ratings
- coins

Use:
- DTO validation
- Zod or Joi validation
- proper status codes
- centralized error handling

==================================================
ADVANCED FEATURES
==================================================

Designing scalable matching engine for:
- geofence matching
- trip-request matching
- urgent broadcasts
- personalized recommendations

Implement:
- notification cooldowns
- request prioritization
- duplicate prevention
- transactional coin updates

==================================================
