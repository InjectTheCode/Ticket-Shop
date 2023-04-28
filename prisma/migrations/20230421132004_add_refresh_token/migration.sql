-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userRefreshToken" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userRefreshToken_key" ON "RefreshToken"("userRefreshToken");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userRefreshToken_fkey" FOREIGN KEY ("userRefreshToken") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
