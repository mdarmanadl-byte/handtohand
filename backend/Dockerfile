FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first (better for caching)
COPY package.json yarn.lock* ./

# Install dependencies 
# --frozen-lockfile ensures it uses your exact versions
RUN yarn install --frozen-lockfile

# Copy the rest of your code
COPY . .

# Match your env PORT
EXPOSE 5000

# Start the app
CMD ["yarn", "start"]
