import QuestionForm from "@/app/components/forms/QuestionForm";

export default function Questions() {
  return (
    <div>
      <QuestionForm />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Questions | Quiz App",
  };
}