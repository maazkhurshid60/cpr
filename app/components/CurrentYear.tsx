import { cacheLife } from "next/cache";

/** The year for the copyright line. With Cache Components on, `new Date()`
 *  can only be read inside a cached scope; this refreshes daily. */
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
