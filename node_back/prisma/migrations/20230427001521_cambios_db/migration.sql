/*
  Warnings:

  - You are about to drop the column `DNI_Alumno` on the `divison_de_alumno` table. All the data in the column will be lost.
  - You are about to alter the column `DNI_Alumno` on the `faltas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `Tipo` on the `faltas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,1)`.
  - You are about to alter the column `Nota` on the `notas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,1)`.

*/
-- DropIndex
DROP INDEX `Clase_Profesor_ID_key` ON `clase`;

-- DropIndex
DROP INDEX `divison_de_alumno_DNI_Alumno_key` ON `divison_de_alumno`;

-- AlterTable
ALTER TABLE `alumno` MODIFY `Nombre` VARCHAR(100) NULL,
    MODIFY `Apellido` VARCHAR(100) NULL,
    MODIFY `Mail` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `clase` MODIFY `Fecha_Comienzo` DATE NULL,
    MODIFY `Fecha_Final` DATE NULL;

-- AlterTable
ALTER TABLE `divison_de_alumno` DROP COLUMN `DNI_Alumno`,
    ADD COLUMN `DNi_Alumno` INTEGER NULL;

-- AlterTable
ALTER TABLE `evaluaciones` MODIFY `Fecha` DATE NULL;

-- AlterTable
ALTER TABLE `faltas` MODIFY `DNI_Alumno` INTEGER NOT NULL,
    MODIFY `Fecha` DATE NULL,
    MODIFY `Tipo` DECIMAL(10, 1) NOT NULL;

-- AlterTable
ALTER TABLE `notas` MODIFY `Nota` DECIMAL(10, 1) NOT NULL;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_Profesor_ID_fkey` FOREIGN KEY (`Profesor_ID`) REFERENCES `profesor`(`DNI_Profesor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divison_de_alumno` ADD CONSTRAINT `divison_de_alumno_DNi_Alumno_fkey` FOREIGN KEY (`DNi_Alumno`) REFERENCES `alumno`(`Dni_Alumno`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faltas` ADD CONSTRAINT `faltas_DNI_Alumno_fkey` FOREIGN KEY (`DNI_Alumno`) REFERENCES `alumno`(`Dni_Alumno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_DNI_Alumno_fkey` FOREIGN KEY (`DNI_Alumno`) REFERENCES `alumno`(`Dni_Alumno`) ON DELETE RESTRICT ON UPDATE CASCADE;
