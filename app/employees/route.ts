import { addToDb, getAllFromDb } from "@/lib/db/utils";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/employees:
 *   get:
 *     description: Returns all employees and some statistics
 *     responses:
 *       200:
 *         description: Returns total number of employees, average years with company, average salary, and employee data
 *       404:
 *         description: No employees found, or error
 *   post:
 *     description: Adds a new employee
 *     parameters:
 *       - in: body
 *         name: employee
 *         description: The employee to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - job_title
 *             - years_with_company
 *             - department
 *             - salary
 *           properties:
 *             name:
 *               type: string
 *             job_title:
 *               type: string
 *             years_with_company:
 *               type: number
 *             department:
 *               type: string
 *             salary:
 *               type: number
 *     responses:
 *       200:
 *         description: Employee added successfully
 *       400:
 *         description: Invalid body
 *       405:
 *         description: Error
 */
export const GET = async (req: Request, res: Response) => {
  try {
    const response = await getAllFromDb();
    if (response.length === 0) {
      return NextResponse.json({
        total: 0,
        average_years_with_company: null,
        average_salary: null,
        employees: [],
      });
    }
    let totalYears = 0;
    let totalSalary = 0;

    response.forEach((employee) => {
      if (employee.years_with_company !== null && employee.salary !== null) {
        totalYears += employee.years_with_company;
        totalSalary += employee.salary;
      }
    });
    const resToSend = {
      total: response.length,
      average_years_with_company:
        Math.round((totalYears / response.length) * 100) / 100,
      average_salary: Math.round((totalSalary / response.length) * 100) / 100,
      employees: response,
    };

    return NextResponse.json(resToSend);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const employee = body;
    // check if all required fields are present OR there is a extra field
    if (
      !employee.name ||
      !employee.job_title ||
      !employee.department ||
      !employee.years_with_company ||
      !employee.salary ||
      Object.keys(employee).length > 5
    ) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    // round off years_with_company and salary to 2 decimal places
    employee.years_with_company =
      Math.round(employee.years_with_company * 100) / 100;
    employee.salary = Math.round(employee.salary * 100) / 100;
    const id = await addToDb(employee);
    const response = {
      message: "Employee added successfully",
      id: id,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 405 });
  }
};
