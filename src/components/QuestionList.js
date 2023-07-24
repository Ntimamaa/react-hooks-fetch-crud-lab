import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = () => {
      fetch("http://localhost:4000/questions")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setQuestions(data);
        })
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((e) => e.id !== id));
      })
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
