import express, { json } from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/global-error.middleware";
import { CreateLog } from "./utils/logger.util";
import dotenv from "dotenv";
import cron from "node-cron";
import { sendWelcomeEmail } from "./emails/welcome-email";
dotenv.config({ path: __dirname + "/../.env" });
import userRoutes from "./router/user.routes";
import questionRoutes from "./router/question.routes";
import tagRoutes from "./router/tag.routes";
import adminRoutes from "./router/admin.routes";

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/admin", adminRoutes);

// Global error handling middlewares
app.use(notFound);
app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  CreateLog.info(`Server running on http://${HOST}:${PORT}`);
});

// send welcome email to newly registered users
// cron.schedule("*/10 * * * * *", async () => {
//   // CreateLog.info("New users welcome email cron job");
//   await sendWelcomeEmail();
// });
