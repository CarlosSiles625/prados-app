-- CreateTable
CREATE TABLE "Textos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "textHtml" TEXT NOT NULL,

    CONSTRAINT "Textos_pkey" PRIMARY KEY ("id")
);
