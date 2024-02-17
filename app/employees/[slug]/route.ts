import {
  deleteOneFromDb,
  getOneFromDb,
  modifyOneColumnInDb,
  updateOneInDb,
} from "@/lib/db/utils";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     description: Returns the employee with the given id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the employee data
 *       404:
 *         description: Employee not found
 *   put:
 *     description: Updates the employee with the given id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - job_title
 *               - department
 *               - years_with_company
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *               job_title:
 *                 type: string
 *               department:
 *                 type: string
 *               years_with_company:
 *                 type: number
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Employee updated
 *       400:
 *         description: Invalid body
 *   patch:
 *     description: Modifies the employee with the given id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Employee modified
 *       400:
 *         description: Invalid body
 *   delete:
 *     description: Deletes the employee with the given id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: number } },
  response: NextResponse
) {
  try {
    let slug = params.slug;
    if (isNaN(slug)) {
      return NextResponse.json(
        { error: "Invalid id", status: 400 },
        { status: 400 }
      );
    }
    const employee = await getOneFromDb(slug);
    if (employee.length === 0) {
      return NextResponse.json(
        { error: "Employee not found", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json(employee[0]);
  } catch (error) {
    return NextResponse.json({ error: error, status: 400 }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: number } },
  response: NextResponse
) {
  let slug = params.slug;
  if (isNaN(slug)) {
    return NextResponse.json(
      { error: "Invalid id", status: 400 },
      { status: 400 }
    );
  }
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid body", status: 400 },
        { status: 400 }
      );
    }
    const employee: employee = body;
    if (
      !employee.name ||
      !employee.job_title ||
      !employee.department ||
      !employee.years_with_company ||
      !employee.salary ||
      Object.keys(employee).length !== 5
    ) {
      return NextResponse.json(
        { error: "Invalid body", status: 400 },
        { status: 400 }
      );
    }
    await updateOneInDb(slug, body);
    const response = {
      status: 200,
      message: "Employee updated",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 404 }, { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: number } },
  response: NextResponse
) {
  let slug = params.slug;
  if (isNaN(slug)) {
    return NextResponse.json(
      { error: "Invalid id", status: 400 },
      { status: 400 }
    );
  }
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid body", status: 400 },
        { status: 400 }
      );
    }
    // get the keys and values from the body
    await modifyOneColumnInDb(slug, body);
    const response = {
      status: 200,
      message: "Employee modified",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 404 }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: number } },
  response: NextResponse
) {
  let slug = params.slug;
  if (isNaN(slug)) {
    return NextResponse.json(
      { error: "Invalid id", status: 400 },
      { status: 400 }
    );
  }
  try {
    await deleteOneFromDb(slug);
    const response = {
      status: 200,
      message: "Employee deleted",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 404 }, { status: 404 });
  }
}
