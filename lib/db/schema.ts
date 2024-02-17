import { mysqlTable, serial, varchar, double } from "drizzle-orm/mysql-core";

export const employees = mysqlTable("employees", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  job_title: varchar("job_title", { length: 256 }),
  years_with_company: double("years_with_company"),
  department: varchar("department", { length: 256 }),
  salary: double("salary"),
});
