import { getApiDocs } from "@/lib/swagger";

import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="h-full w-full">
      <ReactSwagger spec={spec} />
    </section>
  );
}
