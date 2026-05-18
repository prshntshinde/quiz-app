import Question from "@/app/components/Question";
import { fetchQuestions } from "@/libs/data";

interface QuestionData {
  _id: string;
  question_id: number;
  question: string;
  options: Array<{ 0: string; 1: string; 2: string; 3: string }>;
  answer: number;
  explanation: string;
}

interface AnswerPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerPage({ params }: Readonly<AnswerPageProps>) {
  const { id } = await params;
  const questions = (await fetchQuestions(id)) as QuestionData[];

  return (
    <main>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8">
        {questions.map((q) => (
          <div key={q._id} className="pb-3" id={"q-" + q.question_id}>
            <Question
              question_id={q.question_id}
              question={q.question}
              option1={q.options[0][0]}
              option2={q.options[0][1]}
              option3={q.options[0][2]}
              option4={q.options[0][3]}
              explanation={q.explanation}
              answer={q.answer}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export function generateMetadata() {
  return {
    title: "Questions | Quiz App",
  };
}