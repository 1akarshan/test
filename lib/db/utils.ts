//@ts-nocheck
"use server";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { employees } from "./schema";

export const addToDb = async (employee: employee) => {
  const { insertId } = await db.insert(employees).values(employee).execute();
  revalidatePath("/employees");
  revalidatePath(`/employees/${insertId}`);
  return insertId;
};

export const getAllFromDb = async () => {
  // sort by years_with_company in descending order and don't have the job_title column
  let res = await db
    .select({
      id: employees.id,
      name: employees.name,
      years_with_company: employees.years_with_company,
      department: employees.department,
      salary: employees.salary,
    })
    .from(employees)
    .orderBy(desc(employees.years_with_company))
    .execute();

  // Format years_with_company to have two decimal places
  res = res.map((employee) => ({
    ...employee,
    years_with_company: parseFloat(employee.years_with_company.toFixed(2)),
    salary: parseFloat(employee.salary.toFixed(2)),
  }));

  revalidatePath("/employees");
  return res;
};

export const getOneFromDb = async (id: number) => {
  const res = await db
    .select()
    .from(employees)
    .where(eq(employees.id, id))
    .execute();
  revalidatePath("/employees");
  revalidatePath(`/employees/${id}`);
  return res;
};
export const updateOneInDb = async (id: number, employee: employee) => {
  const res = db
    .update(employees)
    .set(employee)
    .where(eq(employees.id, id))
    .execute();
  revalidatePath("/employees");
  revalidatePath(`/employees/${id}`);
  return res;
};

export const deleteOneFromDb = async (id: number) => {
  const res = db.delete(employees).where(eq(employees.id, id)).execute();
  revalidatePath("/employees");
  revalidatePath(`/employees/${id}`);
  return res;
};

export const modifyOneColumnInDb = async (id: number, value: any) => {
  const res = db
    .update(employees)
    .set(value)
    .where(eq(employees.id, id))
    .execute();
  revalidatePath("/employees");
  revalidatePath(`/employees/${id}`);
  return res;
};
