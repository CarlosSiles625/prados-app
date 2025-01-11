-- CreateTable
CREATE TABLE "Intern" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "born_place" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "references" JSONB[],
    "marital_status" TEXT NOT NULL,
    "direction" JSONB NOT NULL,
    "adiccions" JSONB[],
    "education" JSONB[],
    "profession" TEXT NOT NULL,
    "ocupation" TEXT NOT NULL,
    "talents" JSONB[],
    "guarantor_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "interned_at" TIMESTAMP(6) NOT NULL,
    "out_at" TIMESTAMP(6) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Activo',
    "finished_program" BOOLEAN NOT NULL,
    "out_properties" JSONB NOT NULL,

    CONSTRAINT "Intern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intern_id" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Historial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intern_cedula_key" ON "Intern"("cedula");

-- AddForeignKey
ALTER TABLE "Intern" ADD CONSTRAINT "Intern_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_intern_id_fkey" FOREIGN KEY ("intern_id") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
