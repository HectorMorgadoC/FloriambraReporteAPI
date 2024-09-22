import { Router } from "express";
import { MyController } from "../Controller/controller.js";

export const router = Router();

    router.get('/',MyController.getAll);

    router.get('/reports/:name',MyController.getReportsList);

    router.get('/machine/:description',MyController.getMachineList);

    router.get('/order/:number',MyController.getOrderList);

    router.post('/',MyController.createReport);

    router.patch('/update/:number',MyController.updateReport);

    router.post('/delete/:number',MyController.deleteReport);

    router.get('/reports/:name', MyController.getReportsList)