-- CreateTable
CREATE TABLE "allowed_banks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "allowed_banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_days" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "class_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_schedules" (
    "class_id" INTEGER NOT NULL,
    "schedule_id" INTEGER NOT NULL,

    CONSTRAINT "class_schedules_pkey" PRIMARY KEY ("class_id","schedule_id")
);

-- CreateTable
CREATE TABLE "class_statuses" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR NOT NULL,

    CONSTRAINT "class_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR,
    "teacher_id" VARCHAR,
    "classroom_id" INTEGER,
    "description" VARCHAR,
    "initial_date" DATE NOT NULL,
    "end_date" DATE,
    "class_status_id" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "capacity" INTEGER,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll" (
    "teacher_id" VARCHAR NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "bank_account_number" VARCHAR NOT NULL,
    "bank_account_type" VARCHAR NOT NULL,

    CONSTRAINT "payroll_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "days_id" INTEGER NOT NULL,
    "starts_at" TIME(6) NOT NULL,
    "ends_at" TIME(6) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_classes" (
    "student_id" VARCHAR NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "student_classes_pkey" PRIMARY KEY ("student_id","class_id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "identification_number" VARCHAR(13),
    "mobile_number" VARCHAR(15),
    "date_of_join" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "alias" VARCHAR,
    "date_of_birthday" DATE NOT NULL,
    "has_medical_condition" BOOLEAN NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "identification_number" VARCHAR(13),
    "mobile_number" VARCHAR(15),
    "date_of_join" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "alias" VARCHAR,
    "date_of_birthday" DATE NOT NULL,
    "has_medical_condition" BOOLEAN NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_identification_number_key" ON "students"("identification_number");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_identification_number_key" ON "teachers"("identification_number");

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_class_status_id_fkey" FOREIGN KEY ("class_status_id") REFERENCES "class_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payroll" ADD CONSTRAINT "payroll_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "allowed_banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payroll" ADD CONSTRAINT "payroll_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_days_id_fkey" FOREIGN KEY ("days_id") REFERENCES "class_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

