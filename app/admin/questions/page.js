import { FaEye, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export default async function Questions() {
  const data = await getAllQuestions();
  return (
    <div>
      <Link
        href="/admin/questions/create"
        className="px-4 py-2 text-lg font-bold outline outline-offset-0 outline-1 text-zinc-950 hover:bg-blue-500 hover:text-white"
      >
        Add Question
      </Link>
      <br></br>
      <br></br>

      <div className="overflow-x-auto ">
        <table className="bg-white table-auto ">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-sm font-medium text-left text-white">
                Question
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Option 1
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Option 2
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Option 3
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Option 4
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Answer
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Explanation
              </th>
              <th className="p-4 text-sm font-medium text-left text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="">
            {data.map((question) => (
              <tr key={question._id} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black text-preety">
                  {question.question}
                </td>
                <td className="p-4 text-sm text-black">
                  {question.options[0][0]}
                </td>
                <td className="p-4 text-sm text-black">
                  {question.options[0][1]}
                </td>
                <td className="p-4 text-sm text-black">
                  {question.options[0][2]}
                </td>
                <td className="p-4 text-sm text-black">
                  {question.options[0][3]}
                </td>
                <td className="p-4 text-sm text-black">{question.answer}</td>
                <td className="p-4 text-sm text-black">
                  {question.explanation}
                </td>
                <td className="p-4">
                  <button className="mr-4" title="Edit">
                    <FaRegEdit
                      className="w-5 fill-blue-500 hover:fill-blue-700"
                      size={24}
                    />
                  </button>
                  <button className="mr-4" title="View">
                    <FaEye
                      className="w-5 fill-green-500 hover:fill-green-700"
                      size={24}
                    />
                  </button>
                  {/* <button className="mr-4" title="Delete">
                    <RiDeleteBinLine
                      classNameName="w-5 fill-red-500 hover:fill-red-700"
                      size={24}
                    />
                  </button> */}
                  <Link href={`/admin/questions/${question._id}`}>
                    <RiDeleteBinLine
                      className="w-5 fill-red-500 hover:fill-red-700"
                      size={24}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function generateMetadata({ params }) {
  return {
    title: "Questions | Quiz App",
  };
}
