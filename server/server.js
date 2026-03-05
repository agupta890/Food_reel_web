require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const foodRoutes = require("./routes/food-routes");
const foodPartnerRoutes = require("./routes/food-partner-routes")
const connectDB = require("./db/connection");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-reel-web-1.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
