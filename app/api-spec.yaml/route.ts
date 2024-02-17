//@ts-nocheck
import { NextResponse } from "next/server";
import yaml from "js-yaml";
const yamlString = `
openapi: "3.0.0"
info:
  version: "1.0.0"
  title: "Employee API"
paths:
  /api/employees:
    get:
      description: Returns all employees and some statistics
      responses:
        "200":
          description: Returns total number of employees, average years with company, average salary, and employee data
        "404":
          description: No employees found, or error
    post:
      description: Adds a new employee
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
                - job_title
                - years_with_company
                - department
                - salary
              properties:
                name:
                  type: string
                job_title:
                  type: string
                years_with_company:
                  type: number
                department:
                  type: string
                salary:
                  type: number
      responses:
        "200":
          description: Employee added successfully
        "400":
          description: Invalid body
        "405":
          description: Error
  /api/employees/{id}:
    get:
      description: Returns the employee with the given id
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Returns the employee data
        "404":
          description: Employee not found
    put:
      description: Updates the employee with the given id
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
                - job_title
                - department
                - years_with_company
                - salary
              properties:
                name:
                  type: string
                job_title:
                  type: string
                department:
                  type: string
                years_with_company:
                  type: number
                salary:
                  type: number
      responses:
        "200":
          description: Employee updated
        "400":
          description: Invalid body
    patch:
      description: Modifies the employee with the given id
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        "200":
          description: Employee modified
        "400":
          description: Invalid body
    delete:
      description: Deletes the employee with the given id
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Employee deleted
        "404":
          description: Employee not found
`;
export const GET = async (req: Request, res: Response) => {
  const loadYaml = yaml.load(yamlString);
  const OpenSpecAPIYaml = yaml.dump(loadYaml);
  return new NextResponse(OpenSpecAPIYaml, {
    headers: { "Content-Type": "text/yaml" },
  });
};
