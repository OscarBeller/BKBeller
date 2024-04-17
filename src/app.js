import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { router as productRouter } from "./routes/productRouter.js";
import { router as cartRouter } from "./routes/cartRouter.js";
import __dirname from "./utils.js"

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Handlebars setup
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    return res.render('home')
})

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => console.log(`Server online en puerto:${PORT}`));
