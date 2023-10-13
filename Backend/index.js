const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5000 },
  })
);

app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/usuarios", require("./routes/usuariosRoutes"));
app.use("/api/ordenes", require("./routes/ordersRoutes"));

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
