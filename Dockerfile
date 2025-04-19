# Step 1: Build with Node 23.9
FROM node:23.9 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Clean the default nginx html directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the Vite output (dist folder) to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
