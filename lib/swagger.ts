import { createSwaggerSpec } from "next-swagger-doc";

import "server-only";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/employees",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Docs for Employees (401 project)",
        version: "1.0",
      },
      components: {},
      security: [],
    },
  });
  return spec;
};
