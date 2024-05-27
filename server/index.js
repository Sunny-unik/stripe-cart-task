const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const expresRateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./db");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const paymentRoutes = require("./routes/payments");

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
let validOrigins;
try {
  validOrigins = JSON.parse(process.env.ORIGINS);
} catch (error) {
  console.log(error.stack);
}
app.use(helmet());
app.use(cors({ origin: validOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(
//   expresRateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   })
// );
connectDb();

app.get("/health", (_, res) => res.send("ok"));
app.get("/", (_, res) => res.send("Hello World!"));

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);

app.use(errorHandler);

app.listen(port, () => console.log("app is live on http://localhost:" + port));
