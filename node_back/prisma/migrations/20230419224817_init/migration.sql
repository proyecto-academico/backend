-- CreateTable
CREATE TABLE `administracion` (
    `DNI_Admin` INTEGER NOT NULL,
    `Nombre` VARCHAR(100) NOT NULL,
    `Apellido` VARCHAR(100) NOT NULL,
    `Mail` VARCHAR(100) NOT NULL,
    `Contrasena` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`DNI_Admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumno` (
    `Dni_Alumno` INTEGER NOT NULL,
    `Nombre` VARCHAR(100) NOT NULL,
    `Apellido` VARCHAR(100) NOT NULL,
    `Mail` VARCHAR(100) NOT NULL,
    `contrasena` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Dni_Alumno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clase` (
    `Clase_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Division_ID` INTEGER NOT NULL,
    `Materia_ID` INTEGER NOT NULL,
    `Profesor_ID` INTEGER NOT NULL,
    `Fecha_Comienzo` DATETIME(3) NULL,
    `Fecha_Final` DATETIME(3) NULL,

    UNIQUE INDEX `Clase_Materia_ID_key`(`Materia_ID`),
    UNIQUE INDEX `Clase_Profesor_ID_key`(`Profesor_ID`),
    PRIMARY KEY (`Clase_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division` (
    `Division_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Ano_Escolar` VARCHAR(50) NOT NULL,
    `Division_Escolar` INTEGER NOT NULL,
    `Turno` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Division_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divison_de_alumno` (
    `DivisionDA_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DNI_Alumno` INTEGER NOT NULL,
    `Division_ID` INTEGER NOT NULL,
    `Anio_Calendario` INTEGER NOT NULL,

    UNIQUE INDEX `divison_de_alumno_DNI_Alumno_key`(`DNI_Alumno`),
    PRIMARY KEY (`DivisionDA_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluaciones` (
    `Evaluacion_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Clase_ID` INTEGER NOT NULL,
    `Fecha` DATETIME(3) NOT NULL,
    `Detalles` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Evaluacion_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faltas` (
    `Falta_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DNI_Alumno` VARCHAR(100) NOT NULL,
    `Fecha` DATETIME(3) NOT NULL,
    `Tipo` DECIMAL(65, 30) NOT NULL,
    `jutificada` BOOLEAN NOT NULL,

    PRIMARY KEY (`Falta_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materia` (
    `Materia_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(100) NOT NULL,
    `Ano_escolar` INTEGER NOT NULL,
    `Horas_Semanales` INTEGER NOT NULL,

    PRIMARY KEY (`Materia_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `Notas_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nota` DECIMAL(65, 30) NOT NULL,
    `DNI_Alumno` INTEGER NOT NULL,
    `Evaluacion_ID` INTEGER NOT NULL,

    UNIQUE INDEX `notas_Evaluacion_ID_key`(`Evaluacion_ID`),
    PRIMARY KEY (`Notas_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesor` (
    `DNI_Profesor` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(100) NOT NULL,
    `Apellido` VARCHAR(100) NOT NULL,
    `Mail` VARCHAR(100) NOT NULL,
    `Contrasena` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`DNI_Profesor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
