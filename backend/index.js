import dotenv from 'dotenv';
import express from "express";
import { connectDB } from "./config/db.js"; 
import routes from "./routes/protected.js"; 

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Use routes
app.use("/api/auth", routes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
