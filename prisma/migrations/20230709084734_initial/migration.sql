-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Carts" (
    "cart_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "carts_pk" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "course_id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "cover" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "video_intro" VARCHAR(100) NOT NULL,
    "status" VARCHAR NOT NULL,
    "delete_at" TEXT,
    "create_at" TEXT NOT NULL,

    CONSTRAINT "course_pk" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "lesson_id" INTEGER NOT NULL,
    "topic_id" INTEGER,
    "course_id" INTEGER,
    "lesson_name" VARCHAR(255) NOT NULL,
    "lesson_url" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "lessons_pk" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "TagCourses" (
    "tag_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "TagCourses_pkey" PRIMARY KEY ("tag_id","course_id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tag_id" INTEGER NOT NULL,
    "tag_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "topic_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "topic_name" VARCHAR(255) NOT NULL,
    "topic_url" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "topics_pk" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "trans_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "transactions_pk" PRIMARY KEY ("trans_id")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "fullname" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "dateOfBirth" VARCHAR NOT NULL,
    "avatar" VARCHAR(100) NOT NULL,
    "phone" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "fki_s" ON "UserRoles"("user_id");

-- CreateIndex
CREATE INDEX "fki_user_fk" ON "UserRoles"("user_id");

-- CreateIndex
CREATE INDEX "fki_user_id" ON "UserRoles"("user_id");

-- CreateIndex
CREATE INDEX "user_fk" ON "UserRoles"("user_id");

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "carts_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "carts_fk_1" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "course_fk" FOREIGN KEY ("teacher_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "lessons_fk" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "lessons_fk_1" FOREIGN KEY ("topic_id") REFERENCES "Topics"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TagCourses" ADD CONSTRAINT "tagcourses_fk" FOREIGN KEY ("tag_id") REFERENCES "Tags"("tag_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TagCourses" ADD CONSTRAINT "tagcourses_fk_1" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "topics_fk" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "transactions_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "transactions_fk_1" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "userroles_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "userroles_fk_1" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
