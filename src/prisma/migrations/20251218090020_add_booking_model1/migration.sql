-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isPaymentVerified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
