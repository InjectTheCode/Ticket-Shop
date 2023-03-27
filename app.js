const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
