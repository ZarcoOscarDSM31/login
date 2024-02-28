/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - sensores
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sensores`;

USE `sensores`;

/*Table structure for table `historial` */

DROP TABLE IF EXISTS `historial`;

CREATE TABLE `historial` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_sensor` int DEFAULT NULL,
  `fecha_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  `val_numerico` decimal(10,2) DEFAULT NULL,
  `unidades` varchar(50) DEFAULT '%',  -- Corregido aquí
  PRIMARY KEY (`id_historial`),
  KEY `id_sensor` (`id_sensor`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_sensor`) REFERENCES `sensores` (`id_sensor`)
) ENGINE=InnoDB AUTO_INCREMENT=23;

/*Data for the table `historial` */

insert  into `historial`(`id_historial`,`id_sensor`,`fecha_hora`,`val_numerico`,`unidades`) values 
(1,1,'2024-02-23 14:28:24',40.00,'Porcentaje de Humedad'),
(2,2,'2024-02-23 14:28:24',25.30,'Temperatura'),
(3,1,'2024-02-23 14:30:30',39.00,'%'),
(4,2,'2024-02-23 14:30:30',25.80,'°C'),
(5,1,'2024-02-23 14:30:34',39.00,'%'),
(6,2,'2024-02-23 14:30:34',25.80,'°C'),
(7,1,'2024-02-23 14:30:40',39.00,'%'),
(8,2,'2024-02-23 14:30:40',25.80,'°C'),
(9,1,'2024-02-23 14:30:45',39.00,'%'),
(10,2,'2024-02-23 14:30:45',25.80,'°C'),
(11,1,'2024-02-23 14:30:50',39.00,'%'),
(12,2,'2024-02-23 14:30:50',25.80,'°C'),
(13,1,'2024-02-23 14:30:55',39.00,'%'),
(14,2,'2024-02-23 14:30:55',25.80,'°C'),
(15,1,'2024-02-23 14:31:00',39.00,'%'),
(16,2,'2024-02-23 14:31:00',25.80,'°C'),
(17,1,'2024-02-23 14:31:05',39.00,'%'),
(18,2,'2024-02-23 14:31:05',25.80,'°C'),
(19,1,'2024-02-23 14:31:10',39.00,'%'),
(20,2,'2024-02-23 14:31:10',25.80,'°C'),
(21,1,'2024-02-23 14:31:15',39.00,'%'),
(22,2,'2024-02-23 14:31:15',25.80,'°C');

/*Table structure for table `planta` */

DROP TABLE IF EXISTS `planta`;

CREATE TABLE `planta` (
  `id_planta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `tem_maxima` decimal(5,2) DEFAULT NULL,
  `tem_minima` decimal(5,2) DEFAULT NULL,
  `ph_maximo` decimal(5,2) DEFAULT NULL,
  `ph_minima` decimal(5,2) DEFAULT NULL,
  `hum_maxima` decimal(5,2) DEFAULT NULL,
  `hum_minima` decimal(5,2) DEFAULT NULL,
  `tem_ideal` decimal(5,2) DEFAULT NULL,
  `calidad_luz` varchar(100) DEFAULT NULL,
  `ph_ideal` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_planta`)
) ENGINE=InnoDB ;

/*Data for the table `planta` */

/*Table structure for table `sensores` */

DROP TABLE IF EXISTS `sensores`;

CREATE TABLE `sensores` (
  `id_sensor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo_sensor` varchar(50) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_sensor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 ;

/*Data for the table `sensores` */

insert  into `sensores`(`id_sensor`,`nombre`,`tipo_sensor`,`costo`) values 
(1,'DH11','Humedad',90.00),
(2,'DH11','Temperatura',90.00);

/*Table structure for table `tipo_usuario` */

DROP TABLE IF EXISTS `tipo_usuario`;

CREATE TABLE `tipo_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 ;

/*Data for the table `tipo_usuario` */

insert  into `tipo_usuario`(`id`,`tipo`) values 
(1,'Administrador'),
(2,'Usuario');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB ;

/*Data for the table `usuario` */

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) NOT NULL,
  `password` varchar(130) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `last_session` datetime DEFAULT NULL,
  `activacion` int NOT NULL DEFAULT '0',
  `token` varchar(40) NOT NULL,
  `token_password` varchar(100) DEFAULT NULL,
  `password_request` int DEFAULT '0',
  `id_tipo` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

/*Data for the table `usuarios` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
