import CoursePage, { courseMetadata } from "../CoursePage";

export const metadata = courseMetadata("heartsaver-cpr-first-aid-aed");

export default function HeartsaverPage() {
  return <CoursePage slug="heartsaver-cpr-first-aid-aed" />;
}
