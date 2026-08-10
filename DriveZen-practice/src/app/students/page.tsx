import StudentList from "../../components/StudentList";

const students = [
  {
    id: 1,
    name: "Anusha",
    course: "CSE",
  },
  {
    id: 2,
    name: "Rahul",
    course: "ECE",
  },
];

export default function StudentsPage() {
  return (
    <main>
      <h1>Student Management</h1>

      <StudentList students={students} />
    </main>
  );
}