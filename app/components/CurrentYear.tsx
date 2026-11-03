/** The year for the copyright line. The site is a static export, so this is
 *  the year of the last build; any deploy refreshes it. */
export default function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
