const express = require("express");
const { sequelize } = require("./models");
const router = require("./routers");

const port = process.env.PORT || "3000";
const app = express();

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB Connection has been established successfully.");
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


app.use(express.json());
app.get("/", (req, res) => res.render("tennis king"));
app.use("/", router);

app.listen(port, () => {
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${port}`);
});
