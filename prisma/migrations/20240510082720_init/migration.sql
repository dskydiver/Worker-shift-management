-- CreateEnum
CREATE TYPE "shift_time" AS ENUM ('0_8', '8_16', '16_24');

-- CreateTable
CREATE TABLE "worker" (
    "id" TEXT NOT NULL DEFAULT ulid_generate(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_shift" (
    "id" TEXT NOT NULL DEFAULT ulid_generate(),
    "worker_id" TEXT NOT NULL,
    "shift_date" DATE NOT NULL,
    "shift_time" "shift_time" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "worker_shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "worker_email_key" ON "worker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "worker_shift_worker_id_shift_date_key" ON "worker_shift"("worker_id", "shift_date");

-- CreateIndex
CREATE UNIQUE INDEX "worker_shift_shift_date_shift_time_key" ON "worker_shift"("shift_date", "shift_time");

-- AddForeignKey
ALTER TABLE "worker_shift" ADD CONSTRAINT "worker_shift_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
