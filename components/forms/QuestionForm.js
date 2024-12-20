import React from "react";

const QuestionForm = () => {
  return (
    <div>
      <form>
        <label>
          Question:
          <input type="text" name="question" />
        </label>
        <label>
          Option 1:
          <input type="text" name="option1" />
        </label>
        <label>
          Option 2:
          <input type="text" name="option2" />
        </label>
        <label>
          Option 3:
          <input type="text" name="option3" />
        </label>
        <label>
          Correct Answer:
          <input type="text" name="correctAnswer" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <button onClick={() => console.log("Add Question")}>Add Question</button>
      <button onClick={() => console.log("Delete Question")}>
        Delete Question
      </button>
      <button onClick={() => console.log("Edit Question")}>
        Edit Question
      </button>
    </div>
  );
};

export default QuestionForm;
