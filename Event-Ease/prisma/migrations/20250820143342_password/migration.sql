/*
  Warnings:

  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL;
