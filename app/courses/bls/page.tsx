import CoursePage, { courseMetadata } from "../CoursePage";

export const metadata = courseMetadata("bls");

export default function BlsPage() {
  return <CoursePage slug="bls" />;
}
