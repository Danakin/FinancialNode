-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "order" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT E'#000000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "income" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT E'#000000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
"id" SERIAL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subcategoryId" INTEGER,
    "accountId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "description" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "income" BOOLEAN NOT NULL DEFAULT false,
    "transfer" BOOLEAN NOT NULL DEFAULT false,
    "transferAccountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session.sid_unique" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD FOREIGN KEY("categoryId")REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY("categoryId")REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY("subcategoryId")REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY("transferAccountId")REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
