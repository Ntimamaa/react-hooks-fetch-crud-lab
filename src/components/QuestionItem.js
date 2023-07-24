import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [updatedCorrectIndex, setUpdatedCorrectIndex] = useState(correctIndex);

  useEffect(() => {
    const updateQuestion = () => {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: parseInt(updatedCorrectIndex, 10),
        }),
      })
    };


    updateQuestion();
  }, [id, updatedCorrectIndex, correctIndex]);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectIndexChange = (event) => {
    setUpdatedCorrectIndex(event.target.value);
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDeleteQuestion(id);
      })
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={updatedCorrectIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

