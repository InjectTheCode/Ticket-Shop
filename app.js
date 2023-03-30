const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const userRouter = require("./routes/userRoute");
const ticketRouter = require("./routes/ticketRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
