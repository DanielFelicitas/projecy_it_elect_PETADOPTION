import express from "express";
import dotenv from "dotenv";
import configureCors from "./config/corsConfig.js";
import connectDB from "./config/db.js";
import petRoutes from "./routes/petRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import { requestLogger, addTimeStamp } from "./middleware/customMiddleware.js";
import { globalErrorHandler } from "./middleware/errorHandling.js";
import { urlVersioning } from "./middleware/apiVersioning.js";
import rateLimiter from "./middleware/rateLimiting.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(rateLimiter(100, 15*60*1000));
app.use(express.json());

app.use(globalErrorHandler);
app.use(urlVersioning("v1"));

connectDB();


app.get("/", (req, res) => {
  res.send("🐾 Pet Adoption API is running!");
});

app.use("/api/v1/pets", petRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/adoptions", adoptionRoutes);

//swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
