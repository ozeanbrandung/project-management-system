/*
  Warnings:

  - You are about to drop the `pomodoro_round` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pomodoro_session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pomodoro_round" DROP CONSTRAINT "pomodoro_round_pomodoro_session_id_fkey";

-- DropForeignKey
ALTER TABLE "pomodoro_session" DROP CONSTRAINT "pomodoro_session_user_id_fkey";

-- DropTable
DROP TABLE "pomodoro_round";

-- DropTable
DROP TABLE "pomodoro_session";

-- CreateTable
CREATE TABLE "timer_session" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "timer_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timer_round" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_seconds" INTEGER NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "timer_session_id" TEXT NOT NULL,

    CONSTRAINT "timer_round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timer_session" ADD CONSTRAINT "timer_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timer_round" ADD CONSTRAINT "timer_round_timer_session_id_fkey" FOREIGN KEY ("timer_session_id") REFERENCES "timer_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
