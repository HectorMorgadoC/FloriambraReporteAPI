import { Router } from "express";
import { MyController } from "../Controller/controller.js";
import multer from "multer";

const upload = multer();

export const router = Router();

    router.get('/',MyController.getConnection);

    router.post('/login',upload.none(),MyController.login);

    router.get('/report',MyController.getAll);

    router.post('/report',MyController.createReport);

    router.get('/reports/:name',MyController.getReportsList);

    router.get('/machine/:description',MyController.getMachineList);

    router.get('/order/:number',MyController.getOrderList);


    router.patch('/update/:number',MyController.updateReport);

    router.post('/delete/:number',MyController.deleteReport);

    router.get('/reports/:name', MyController.getReportsList)