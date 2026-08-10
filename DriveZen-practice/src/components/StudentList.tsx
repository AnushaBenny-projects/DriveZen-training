type Student = {
  id: number;
  name: string;
  course: string;
};

type StudentListProps = {
  students: Student[];
};

export default function StudentList({
  students,
}: StudentListProps) {
  return (
    <div>
      <h2>Students</h2>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.course}</p>
        </div>
      ))}
    </div>
  );
}