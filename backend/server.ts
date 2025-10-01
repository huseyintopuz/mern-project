import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // .js kullanın
import productRoutes from './routes/product.routes.js'; // .js kullanın
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// JSON body parser
app.use(express.json());
// CORS ayarları
app.use(cors({
    origin: "http://localhost:5173", // frontend adresi
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Content-Type burada eklenmeli
}));

// Routes
app.use("/api/products", productRoutes);

// Error middleware (en sonda olmalı)
app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server running on port ${PORT}`);
});