import express, { Application } from "express";
import cors from "cors";
import connectDb from "./config/connectDb";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.get("/ping", (_, res) => {
  res.json({
    success: true,
    message: "API up and running",
  });
});

app.use(express.json());
app.use(cors());

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDb();
});
