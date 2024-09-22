import { MysqlModel } from "../Model/modelMysql.js";
import { json } from "express";

export class MyController {

    static async getAll(request,response) {
        try {
            const result = await MysqlModel.getAll();
            response.json(result);
        } catch (error) {
            response.json({error:error});
        }       
    }

    static async getReportsList(request,response){
        try {
            const nombre = request.params.name;
            const reportList = await MysqlModel.getReportsList(nombre);
            response.json(reportList)
        } catch (error) {
            response.json({error:error})
        }
        
    }

    static async getMachineList(request,response){
        try {
            const nombre = request.params.description;
            const machineList = await MysqlModel.getMachineList(nombre);
            response.json(machineList)
        } catch (error) {
            response.json({error:error})
        }
    }
        
    static async getOrderList(request,response){
        try {
            const numberOrder = Number(request.params.number);
            console.log( numberOrder )
            const orderList = await MysqlModel.getOrderList(numberOrder);
            response.json(orderList);
        } catch (error) {
            response.json({error:error})
        }
        
    }

    static async createReport(request,response) {
        try {
            const body = request.body;
            const createReport = await MysqlModel.createReport(body);
            response.json(JSON.stringify(createReport));
        } catch (error) {
            response.json({error:error})
        }
        
    }

    static async updateReport(request,response) {
        try {
            const numberOrder = Number(request.params.number);
            const body = request.body;
            const updateDataReport = MysqlModel.updateReport(numberOrder,body );
        } catch (error) {
            response.json({error:error})
        }
        
    }

    static async deleteReport(request,response) {
        try {
            const numberOrder = Number(request.params.number);
            const deleteReport = await MysqlModel.deleteReport(numberOrder);
            response.json(JSON.stringify(deleteReport));
        } catch (error) {
            response.json({error:error})
        }
        
        
    }

}