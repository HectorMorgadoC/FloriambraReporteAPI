import { json } from "express";
import express,{ json as _json } from "express";
import { router } from "./Router/routers.js";
import  cors  from "cors";

const app = express();


app.use(express.json({type:'*/*'}))

app.use(cors({
    origin:'https://hectormorgadoc.github.io/ReporteFlorambraC/',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(router);

const listen = process.env.PORT ?? 5000;

app.listen(listen, () => {
    console.log( `SERVER RUNNING PORT ${listen}` )
})


