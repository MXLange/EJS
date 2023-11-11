require("dotenv").config();
const express = require("express");
const express_layouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cluster = require("cluster");
const os = require("os");

const session = require("express-session");
const { createClient } = require("redis");
global.redisClient = createClient();
const redisStore = require("connect-redis").default;

const routes = require("./src/app/routes/routes");

// const num_of_cpus = os.cpus().length;
const num_of_cpus = 1;
const app = express();
const port = process.env.PORT || 3333;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_layouts);
app.set("view engine", "ejs");
app.set("views", "./src/app/views");
app.set("layout", "layouts/app_layout");

redisClient.connect().catch((error) => {
    console.log(error)
});
app.use(session({
    store: new redisStore({
        host: "127.0.0.1",
        port: "6379",
        client: redisClient,
        ttl: "86400"
    }),
    secret: "abc123",
    cookie: { maxAge: 86400000 },
    saveUninitialized: true,
    resave: false
}));

app.use(routes);

if(cluster.isMaster) {
    for(let i = 0; i < num_of_cpus; i++) {
        cluster.fork();
    }
} else {
    app.listen(port, () => {
        console.log(`App running on port ${port}, process ${process.pid}`);
        console.log(`http://localhost:${port}`);
    });
}
