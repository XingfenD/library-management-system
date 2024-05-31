-- MySQL Script generated by MySQL Workbench
-- Wed May 22 22:59:57 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema LMS_DB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `LMS_DB` ;

-- -----------------------------------------------------
-- Schema LMS_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LMS_DB` DEFAULT CHARACTER SET utf8 ;
USE `LMS_DB` ;

-- -----------------------------------------------------
-- Table `LMS_DB`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`user` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`user` (
  `uuid` VARCHAR(20) NOT NULL,
  `username` VARCHAR(16) NULL,
  `password` VARCHAR(70) NULL,
  `authority` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;
INSERT INTO `user` (`uuid`, `username`, `password`, `authority`) 
VALUES ('0', 'root', '$2y$10$EIuNJWjyVWN.2IjnkKT8YuXm1/hDtM83EK8voBuQihpw5m7UiUFjW', '4');


-- -----------------------------------------------------
-- Table `LMS_DB`.`user_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`user_info` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`user_info` (
  `card_number` VARCHAR(13) NOT NULL,
  `user_id` VARCHAR(20) NULL,
  `u_name` VARCHAR(20) NULL,
  `u_tele` VARCHAR(45) NULL,
  `u_email` VARCHAR(45) NULL,
  `u_address` VARCHAR(45) NULL,
  INDEX `user_info-user_uuid_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_info-user_uuid`
    FOREIGN KEY (`user_id`)
    REFERENCES `LMS_DB`.`user` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LMS_DB`.`book_index`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`book_index` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`book_index` (
  `book_ind` VARCHAR(10) NOT NULL,
  `book_name` VARCHAR(45) NULL,
  `status` TINYINT NULL,
  `storage_time` VARCHAR(19) NULL,
  PRIMARY KEY (`book_ind`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LMS_DB`.`b_r_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`b_r_record` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`b_r_record` (
  `rec_ind` VARCHAR(18) NOT NULL,
  `book_ind` VARCHAR(16) NULL,
  `borrower_uid` VARCHAR(20) NULL,
  `is_borrow` TINYINT(1) NULL,
  PRIMARY KEY (`rec_ind`),
  INDEX `rcd-book_ind_book_ind_idx` (`book_ind` ASC) VISIBLE,
  INDEX `rcd-user_uuid_idx` (`borrower_uid` ASC) VISIBLE,
  CONSTRAINT `rcd-book_ind_book_ind`
    FOREIGN KEY (`book_ind`)
    REFERENCES `LMS_DB`.`book_index` (`book_ind`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rcd-user_uuid`
    FOREIGN KEY (`borrower_uid`)
    REFERENCES `LMS_DB`.`user` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LMS_DB`.`book_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`book_info` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`book_info` (
  `book_ind` VARCHAR(10) NOT NULL,
  `price` INT NULL,
  PRIMARY KEY (`book_ind`),
  CONSTRAINT `book_info-book_index-book_ind`
    FOREIGN KEY (`book_ind`)
    REFERENCES `LMS_DB`.`book_index` (`book_ind`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LMS_DB`.`request_rcd`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LMS_DB`.`request_rcd` ;

CREATE TABLE IF NOT EXISTS `LMS_DB`.`request_rcd` (
  `request_id` VARCHAR(20) NULL,
  `ip` VARCHAR(15) NULL,
  `time` VARCHAR(19) NULL,
  CONSTRAINT `request_user`
    FOREIGN KEY (`request_id`)
    REFERENCES `LMS_DB`.`user` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
