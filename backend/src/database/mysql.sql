-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: alzhividaPrueba
-- Source Schemata: alzhividaPrueba
-- Created: Sun Jun  1 10:23:12 2025
-- Workbench Version: 8.0.42
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema alzhividaPrueba
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `alzhividaPrueba` ;
CREATE SCHEMA IF NOT EXISTS `alzhividaPrueba` ;


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Rol
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Rol` (
  `c_rol` CHAR(100) NOT NULL,
  `l_rol` VARCHAR(50) NULL,
  `l_descripcion` LONGTEXT NULL,
  PRIMARY KEY (`c_rol`));


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Usuario
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Usuario` (
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_rol` CHAR(100) NULL,
  `l_nomUsua` VARCHAR(255) NOT NULL DEFAULT '',
  `l_apellUsua` VARCHAR(255) NOT NULL DEFAULT '',
  `f_nacimiento` DATETIME(6) NULL,
  `l_emailUsua` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `l_genUsua` CHAR(20) NOT NULL DEFAULT '',
  `l_fotUsua` CHAR(75) NOT NULL DEFAULT '',
  `l_paisUsua` CHAR(75) NOT NULL DEFAULT '',
  `l_contraUsua` VARCHAR(100) NULL DEFAULT '',
  `q_membresia` SMALLINT NOT NULL DEFAULT 0,
  `f_creacion` DATETIME(6) NULL,
  `n_ticket` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`c_usua`),
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`c_rol`)
    REFERENCES `alzhividaPrueba`.`Rol` (`c_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Etiqueta
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Etiqueta` (
  `c_etiqueta` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `l_etiqueta` LONGTEXT NULL,
  PRIMARY KEY (`c_etiqueta`));

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Sesion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Sesion` (
  `c_sesion` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `l_sesion` LONGTEXT NULL,
  `l_descripcion` LONGTEXT NULL,
  `l_linkAdjuntar` VARCHAR(300) NULL,
  `q_exclusivo` SMALLINT NULL,
  `l_linkImagen` VARCHAR(300) NULL,
  `f_sesion` DATETIME(6) NULL,
  PRIMARY KEY (`c_sesion`));

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.SesionEtiqueta
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`SesionEtiqueta` (
  `c_sesionEtiqueta` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_sesion` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_etiqueta` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  PRIMARY KEY (`c_sesionEtiqueta`),
  CONSTRAINT `FK_SesionEtiqueta_Sesion`
    FOREIGN KEY (`c_sesion`)
    REFERENCES `alzhividaPrueba`.`Sesion` (`c_sesion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SesionEtiqueta_Etiqueta`
    FOREIGN KEY (`c_etiqueta`)
    REFERENCES `alzhividaPrueba`.`Etiqueta` (`c_etiqueta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.SesionHistorico
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`SesionHistorico` (
  `c_sesion` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `f_sesionHistorico` DATETIME(6) NOT NULL,
  `f_registro` DATETIME(6) NULL,
  PRIMARY KEY (`c_sesion`, `f_sesionHistorico`),
  CONSTRAINT `FK_SesionHistorico_Sesion`
    FOREIGN KEY (`c_sesion`)
    REFERENCES `alzhividaPrueba`.`Sesion` (`c_sesion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.DetalleSesion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`DetalleSesion` (
  `c_detSesion` CHAR(18) NOT NULL,
  `c_sesion` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `c_usuaInscrito` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `f_inscrib` DATETIME(6) NULL,
  PRIMARY KEY (`c_detSesion`),
  CONSTRAINT `FK_DetalleSesion_Sesion`
    FOREIGN KEY (`c_sesion`)
    REFERENCES `alzhividaPrueba`.`Sesion` (`c_sesion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_DetalleSesion_Usuario`
    FOREIGN KEY (`c_usuaInscrito`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Membresia
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Membresia` (
  `c_membre` CHAR(100) NOT NULL,
  `l_membre` VARCHAR(50) NULL,
  `l_descrip` LONGTEXT NULL,
  `n_duraDias` INT NULL,
  `s_cost` DOUBLE NULL,
  PRIMARY KEY (`c_membre`));


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.CompraMembresias
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`CompraMembresias` (
  `c_comMem` VARCHAR(60) NOT NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `c_membre` CHAR(100) NULL,
  `s_importTotal` DOUBLE NULL,
  `f_inicio` DATETIME(6) NULL,
  `f_final` DATETIME(6) NULL,
  `f_compra` DATETIME(6) NULL,
  `c_estado` CHAR(45) NULL,
  PRIMARY KEY (`c_comMem`),
  CONSTRAINT `FK_usuario_compraMembresias`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_membresias_compraMembresias`
    FOREIGN KEY (`c_membre`)
    REFERENCES `alzhividaPrueba`.`Membresia` (`c_membre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Notificacion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Notificacion` (
  `c_notificacion` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `l_tipoEvento` LONGTEXT NULL,
  `c_origen` VARCHAR(0) CHARACTER SET 'utf8mb4' NULL,
  `l_mensaje` LONGTEXT NULL,
  `f_generada` DATETIME(6) NULL,
  `q_vista` SMALLINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`c_notificacion`),
  CONSTRAINT `FK_Notificacion_Usuario`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Reaccion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Reaccion` (
  `c_reac` CHAR(100) NOT NULL,
  `l_reac` VARCHAR(50) NULL,
  PRIMARY KEY (`c_reac`));

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Publicacion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Publicacion` (
  `c_publi` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `l_publi` LONGTEXT NULL,
  `l_descripPubli` LONGTEXT NULL,
  `l_nomArchivo` LONGTEXT NULL,
  `l_rutaArchivo` VARCHAR(75) NULL,
  `f_publicacion` DATETIME(6) NULL,
  PRIMARY KEY (`c_publi`),
  CONSTRAINT `FK_Publicacion_Usuario`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.ReaccionPublicacion
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`ReaccionPublicacion` (
  `c_reacPubli` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_publi` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `c_reac` CHAR(100) NOT NULL,
  `f_reacPubli` DATETIME(6) NOT NULL,
  PRIMARY KEY (`c_reacPubli`),
  CONSTRAINT `FK_Reaccion_ReaccionPublicacion`
    FOREIGN KEY (`c_reac`)
    REFERENCES `alzhividaPrueba`.`Reaccion` (`c_reac`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Publicacion_ReaccionPublicacion`
    FOREIGN KEY (`c_publi`)
    REFERENCES `alzhividaPrueba`.`Publicacion` (`c_publi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Usuario_ReaccionPublicacion`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Comentario
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Comentario` (
  `c_comen` CHAR(18) NOT NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `c_publi` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `l_comen` LONGTEXT NULL,
  `f_comentario` DATETIME(6) NULL,
  PRIMARY KEY (`c_comen`),
  CONSTRAINT `FK_Publicacion_Comentario`
    FOREIGN KEY (`c_publi`)
    REFERENCES `alzhividaPrueba`.`Publicacion` (`c_publi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Usuario_Comentario`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.PublicacionHistorico
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`PublicacionHistorico` (
  `c_publi` VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL,
  `f_publicacionHistorico` DATETIME(6) NOT NULL,
  `f_registro` DATETIME(6) NOT NULL,
  PRIMARY KEY (`c_publi`, `f_publicacionHistorico`),
  CONSTRAINT `FK_PublicacionHistorico_Publicacion`
    FOREIGN KEY (`c_publi`)
    REFERENCES `alzhividaPrueba`.`Publicacion` (`c_publi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



-- ----------------------------------------------------------------------------
-- Table alzhividaPrueba.Reporte
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `alzhividaPrueba`.`Reporte` (
  `c_reporte` CHAR(18) NOT NULL,
  `c_publi` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `c_usua` VARCHAR(60) CHARACTER SET 'utf8mb4' NULL,
  `c_motivoRepor` LONGTEXT NULL,
  `f_repor` DATETIME(6) NULL,
  PRIMARY KEY (`c_reporte`),
  CONSTRAINT `FK_Usuario_Reporte`
    FOREIGN KEY (`c_usua`)
    REFERENCES `alzhividaPrueba`.`Usuario` (`c_usua`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Publicacion_Reporte`
    FOREIGN KEY (`c_publi`)
    REFERENCES `alzhividaPrueba`.`Publicacion` (`c_publi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
SET FOREIGN_KEY_CHECKS = 1;
