import React from "react";
import StartButton from "./StartButton";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default async function QuizList() {
  return (
    <div className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300">
      <div>
        <h2 className="text-2xl font-bold">Title</h2>
        <div>Description</div>
      </div>
      <div className="flex gap-2">
        <StartButton />
        <Link href={"/editQuiz/1"} className="text-yellow-300">
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
}
