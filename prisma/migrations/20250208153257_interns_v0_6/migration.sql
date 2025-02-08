-- AlterTable
ALTER TABLE "Intern" ADD COLUMN     "guarantor_address" JSONB,
ADD COLUMN     "guarantor_cedula" BIGINT,
ADD COLUMN     "guarantor_phone" TEXT;
