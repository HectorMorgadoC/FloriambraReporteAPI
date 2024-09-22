import mysql from 'mysql2/promise'

const config = {
    host: 'bxu4zbnvpcfxa8ehm44y-mysql.services.clever-cloud.com',
    user: 'uhxpwukbgztnap2c',
    port: 3306,
    password: 'bX6qVxgSwVHeMMP0fYIj',
    database: 'bxu4zbnvpcfxa8ehm44y'
}

let connection ;
const getConnection = async() => {
    if(!connection){
        connection =  await mysql.createConnection( config )
    }
    return connection;
}

export class MysqlModel{

    static async getAll(){
        const result = [];
        const reports = 'SELECT * FROM reportero';       
        const description = 'SELECT * FROM descripcion_maquina';
        const workRoutine = 'SELECT * FROM rutina_trabajo';
        const assigned = 'SELECT * FROM asignado';

        try {
            const connection = await getConnection();
            const [ resultReporters, resultDescription, resultWorkRoutine, resultAssigned ] = await Promise.all([
                connection.query(reports),
                connection.query(description),
                connection.query(workRoutine),
                connection.query(assigned)
            ]);
            result.push(
                { content: {
                    reporters : resultReporters[0],
                    machine : resultDescription[0],
                    workRoutine : resultWorkRoutine[0],
                    assigned : resultAssigned[0]
                    } 
                }
                )
            return result 
        } catch (error) {
            return [{ error: error.message }]
        }
    }

    static async getReportsList(name){
        try {
            const connection = await getConnection();
            const query = `SELECT id FROM reportero WHERE nombre = '${name}';`;
            const consult = await connection.query(query);
            const queryList = `SELECT * FROM reporte WHERE id_reportero = '${consult[0][0].id}';`;
            const result = await connection.query(queryList);

            return [{ reports: result[0]  }]
        } catch (error) {
            return [{ error: error.message }]
        }    
    }

    static async getMachineList(name){
        try {
            const connection = await getConnection();
            const query = `SELECT id FROM descripcion_maquina WHERE descripcion = '${name}';`;
            const consult = await connection.query(query);
            
            const queryList = `SELECT * FROM reporte WHERE id_descripcion_maquina = '${consult[0][0].id}';`;
            const result = await connection.query(queryList);
            return [{ reports:result[0] }]

        } catch (error) {
            return [{ error: error.message }]
        }
    }

    static async getOrderList(numberOrder){
        try {
        const connection = await getConnection();
        const queryList = `SELECT * FROM reporte WHERE numero_orden = ${numberOrder};`;
        const result = await connection.query(queryList);

        return [{ report: result[0] }]

        } catch (error) {
            return [{ error: error.message }]
        }                    
    }

    static async createReport(dataReport){
        const { 
            descripcionMaquina,
            rutinaTrabajo,
            reportero,
            asignado,
            fechaAviso,
            fechaEjecucion,
            reporteFalla,
            trabajoEfectuar,
            comentarios,
        } = dataReport;

        const descripcion = `SELECT id FROM descripcion_maquina WHERE descripcion = '${descripcionMaquina}';`;
        const rutina = `SELECT id FROM rutina_trabajo WHERE descripcion = '${rutinaTrabajo}';`;
        const selectReportero = `SELECT id FROM reportero WHERE nombre = '${reportero}';`;
        const selectAsignado = `SELECT id FROM asignado WHERE nombre = '${asignado}';`;


        try {
            const connection = await getConnection();
            let idDescription = await connection.query(descripcion);
            let idRutina = await connection.query(rutina);
            let idReportero = await connection.query(selectReportero);
            let idAsignado = await connection.query(selectAsignado);

            idDescription = idDescription[0][0].id;
            idRutina = idRutina[0][0].id;
            idReportero = idReportero[0][0].id;
            idAsignado = idAsignado[0][0].id;

            const ingresoReporte = `INSERT INTO reporte(id_descripcion_maquina,id_rutina_trabajo,id_reportero,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla,trabajo_efectuar,comentarios) VALUES('${idDescription}','${idRutina}','${idReportero}','${idAsignado}','${fechaAviso}','${fechaEjecucion}','${reporteFalla}','${trabajoEfectuar}','${comentarios}');` 

            const newReport = await connection.query(ingresoReporte)
            return newReport

        } catch (error) {
            return {
                error: error.message
            }
        }
    
    }

    static async updateReport (number, data ){
        const order = number;
    
        const {
            reportero,
            asignado,
            descripcion,
            rutinaTrabajo,
            fechaAviso,
            fechaEjecucion,
            reporteFalla,
            trabajoEfectuar,
            comentarios
        } = data;


        const queryIdReportero = `SELECT id FROM reportero WHERE nombre = '${reportero}';`;
        const queryAsignado = `SELECT id FROM asignado WHERE nombre = '${asignado}';`;
        const queryDescripcion = `SELECT id FROM descripcion_maquina WHERE descripcion = '${descripcion}';`;
        const queryRutinaTrabajo = `SELECT id FROM rutina_trabajo WHERE descripcion = '${rutinaTrabajo}'`

        try {
            const connection = await getConnection();
            const idReportero = await connection.query(queryIdReportero);
            const idAsignado = await connection.query(queryAsignado);
            const idDescripcion = await connection.query(queryDescripcion);
            const idRutinaTrabajo = await connection.query(queryRutinaTrabajo);
            
            const queryUpdate = `UPDATE reporte SET id_descripcion_maquina = '${idDescripcion[0][0].id}', id_reportero = '${idReportero[0][0].id}', id_asignado = '${idAsignado[0][0].id}', id_rutina_trabajo = '${idRutinaTrabajo[0][0].id}', fecha_aviso = '${fechaAviso}', fecha_ejecucion = '${fechaEjecucion}', reporte_falla = '${reporteFalla}', trabajo_efectuar = '${trabajoEfectuar}', comentarios = '${comentarios}' WHERE numero_orden = ${order};`;
            const update = await connection.query(queryUpdate);
            
            return update;
        } catch (error) {
            return {
                error: error.messagge
            }
        }
    }

    static async deleteReport(number){
        const queryId = `SELECT id FROM reporte WHERE numero_orden = ${number}`

        try {
            const connection = await getConnection();
            const idReport = await connection.query(queryId);

            const queryResponse = `DELETE FROM reporte WHERE id = '${idReport[0][0].id}'`

            const deleteReportId = await connection.query(queryResponse);

            return deleteReportId
        } catch (error) {
            return {
                error:error.message
            }
        }       
    }
}