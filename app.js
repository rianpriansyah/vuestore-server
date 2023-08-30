/* MongoDB Server */
// "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to vuestore-server",
  });
});

require("./app/routes/product.route")(app);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
