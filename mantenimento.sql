-- Crear la base de datos
CREATE DATABASE maintenance;
-- Usar la base de datos
USE maintenance;
-- Crear las tablas
-- descripcion_maquinas
CREATE TABLE machine_description(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    description VARCHAR(50)
);

CREATE TABLE work_routine(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    description VARCHAR(50)
);

CREATE TABLE reporter(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    name VARCHAR(50)
);

CREATE TABLE assigned(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    name VARCHAR(50)
);

CREATE TABLE report(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    order_number INT NOT NULL AUTO_INCREMENT UNIQUE,
    id_machine_description CHAR(36) NOT NULL,
    id_work_routine CHAR(36) NOT NULL,
    id_reporter CHAR(36) NOT NULL,
    id_assigned CHAR(36) NOT NULL,
    notice_date DATETIME NOT NULL,
    date_of_execution DATETIME NOT NULL,
    report_failure VARCHAR(255) NOT NULL,
    work_done VARCHAR(255) NOT NULL,
    comments VARCHAR(255),
    FOREIGN KEY(id_machine_description) REFERENCES machine_description(id),
    FOREIGN KEY(id_work_routine) REFERENCES work_routine(id),
    FOREIGN KEY(id_reporter) REFERENCES reporter(id),
    FOREIGN KEY(id_assigned) REFERENCES assigned(id)
);

CREATE TABLE user_description(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL 
);

ALTER TABLE report AUTO_INCREMENT = 100;

-- Para ingresar datos en descripcion_maquina
INSERT INTO machine_description( description ) VALUE ("Aglomeradora");
-- Para ingresar datos en rutina_trabajo
INSERT INTO work_routine( description ) VALUE ("Mantenimiento preventivo");
-- Para ingresar datos en reportero
INSERT INTO reporter( name ) VALUE (" henry IMPRESOR ");
-- Para ingresar datos en asignado
INSERT INTO assigned( name ) VALUE ( "Hector ELECTRICISTA" );

INSERT INTO report( id_machine_description,id_work_routine,id_reporter,id_asigned,notice_date,date_of_execution,report_failure,work_done,comments)
VALUES ("07424478-e7b5-11ee-a395-24fd527c6f15","e2981afc-e7b8-11ee-a395-24fd527c6f15",
        "87a6c02b-e7b9-11ee-a395-24fd527c6f15","3617c93e-e7ba-11ee-a395-24fd527c6f15",
        "2022-06-02","2022-06-02","falla de velocidad principal",
        "Se coloca potenciometro al variador del motor principal , para setear una velocidad ya que la tarjeta que manda la señal que recibe del plc se encuentra dañada",
        "Sin comentarios");