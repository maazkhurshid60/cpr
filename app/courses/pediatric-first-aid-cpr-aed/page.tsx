import CoursePage, { courseMetadata } from "../CoursePage";

export const metadata = courseMetadata("pediatric-first-aid-cpr-aed");

export default function PediatricPage() {
  return <CoursePage slug="pediatric-first-aid-cpr-aed" />;
}
