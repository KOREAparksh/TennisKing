const express = require("express");
const { sequelize } = require("./models");
const router = require("./routers");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { notFound, errorConverter, errorHandler } = require("./middlewares/error");
const logger = require("./modules/logger");

const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: [process.env.LOCAL_ENDPOINT, process.env.CLIENT_ENDPOINT],
    credentials: true,
    method: ["POST", "GET", "PUT", "PATCH", "DELETE"],
};

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("🚀 Database connect successfully.");
    })
    .catch((err) => {
        console.error("❌ Unable to connect to the database:", err);
    });

app.use(cors(corsOptions));
app.use(morgan("dev", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${port}`);
});
