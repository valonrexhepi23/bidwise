# Step 1: Use an appropriate base image
FROM node:20.9.0

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Expose the port
EXPOSE 3000

# Step 8: Start the app
CMD ["npm", "start"]
