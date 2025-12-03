import express from "express";
import dotenv from "dotenv";
import configureCors from "./config/corsConfig.js";
import connectDB from "./config/db.js";
import petRoutes from "./routes/petRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import { swaggerSpec } from "./config/swagger.js";
import { requestLogger, addTimeStamp } from "./middleware/customMiddleware.js";
import { globalErrorHandler } from "./middleware/errorHandling.js";
import { urlVersioning } from "./middleware/apiVersioning.js";
import rateLimiter from "./middleware/rateLimiting.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(rateLimiter(100, 15 * 60 * 1000));
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

// Swagger UI (Vercel-safe version)
app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="/api-docs-assets/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>

        <script src="/api-docs-assets/swagger-ui-bundle.js"></script>
        <script src="/api-docs-assets/swagger-ui-standalone-preset.js"></script>

        <script>
          window.onload = function () {
            SwaggerUIBundle({
              spec: ${JSON.stringify(swaggerSpec)},
              dom_id: "#swagger-ui",
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: "StandaloneLayout"
            });
          };
        </script>
      </body>
    </html>
  `);
});

export default app;
