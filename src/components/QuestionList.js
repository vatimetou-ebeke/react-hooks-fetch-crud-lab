import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  console.log(questions);



  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);


  function handleChangeAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        const updatedQuestion = questions.map((question) => {
          if (question.id === updatedItem.id) {
            return updatedItem;
          } else {
            return question
          }
        })
        setQuestions(updatedQuestion)
      })
  }

  
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      })
  }



  //console.log(questions)
  const questionItems = questions.map((q) => (
    <QuestionItem question={q} handleDeleteQuestion={handleDeleteQuestion} handleChangeAnswer={handleChangeAnswer} />

  ))
  return (
    <section>
     
      <h1>Quiz Questions</h1>
      <ul>
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
