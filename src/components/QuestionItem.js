import React from "react";

function QuestionItem({ question, handleDeleteQuestion, handleChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteClick() {
    handleDeleteQuestion(id)
  }
  function handleAnswerUpdate(e) {
    handleChangeAnswer(id, correctIndex)
    console.log("correctindex= ", correctIndex)
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
