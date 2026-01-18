"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateQuiz } from "@/lib/actions/quiz";
import FormSubmitButton from "@/app/components/forms/FormSubmitButton";
import PropTypes from "prop-types";

export default function EditQuizForm({ quiz }) {
    const [title, setTitle] = useState(quiz.title || "");
    const [description, setDescription] = useState(quiz.description || "");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Get the most recent history entry for "safety" display
    const lastHistory = quiz.history && quiz.history.length > 0
        ? quiz.history[quiz.history.length - 1]
        : null;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>

            {lastHistory && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <p className="font-bold mb-1">Previous Version (Safety Backup):</p>
                    <p><strong>Title:</strong> {lastHistory.title}</p>
                    <p><strong>Description:</strong> {lastHistory.description || "N/A"}</p>
                    <p className="text-xs mt-2 italic text-amber-600">Saved on: {new Date(lastHistory.updatedAt).toLocaleString()}</p>
                    <button
                        type="button"
                        onClick={() => {
                            setTitle(lastHistory.title);
                            setDescription(lastHistory.description || "");
                        }}
                        className="mt-2 text-blue-600 hover:underline font-semibold"
                    >
                        Restore these values
                    </button>
                </div>
            )}

            <form
                action={async (formData) => {
                    setIsLoading(true);
                    try {
                        const result = await updateQuiz(formData);
                        alert(result.message);
                        router.refresh();
                        router.push("/admin/quiz");
                    } catch (error) {
                        alert(error.message);
                    } finally {
                        setIsLoading(false);
                    }
                }}
                className="flex flex-col gap-4"
            >
                <input type="hidden" name="id" value={quiz._id} />
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Quiz Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Quiz Title"
                        className="p-2 border border-slate-500 rounded"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Quiz Description</label>
                    <textarea
                        name="description"
                        placeholder="Quiz Description"
                        className="p-2 border border-slate-500 rounded min-h-[100px]"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="flex gap-4 items-center">
                    <FormSubmitButton value="Update Quiz" isLoading={isLoading} />
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-slate-500 rounded hover:bg-slate-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

EditQuizForm.propTypes = {
    quiz: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                updatedAt: PropTypes.string,
            })
        ),
    }).isRequired,
};
