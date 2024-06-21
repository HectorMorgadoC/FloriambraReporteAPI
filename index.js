import { json } from "express";
import express,{ json as _json } from "express";
import { router } from "./Router/routers.js";
import  cors  from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.json({type:'*/*'}))

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/',createProxyMiddleware({
    target: 'https://floriambra-reporte-api.vercel.app/',
    changeOrigin: true,
    pathRewrite: {
        'ʌ/': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization')
    }

}))

app.use(router);

const listen = process.env.PORT ?? 5000;

app.listen(listen, () => {
    console.log( `SERVER RUNNING PORT ${listen}` )
})


