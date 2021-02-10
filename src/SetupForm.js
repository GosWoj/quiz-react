import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">Number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="Entertainment_Film">Film</option>
              <option value="Entertainment_Books">Books</option>
              <option value="Entertainment_Music">Music</option>
              <option value="Entertainment_Television">Television</option>
              <option value="Entertainment_Video_Games">Video Games</option>
              <option value="Science_Computers">Science: Computers</option>
              <option value="Mythology">Mythology</option>
              <option value="Art">Art</option>
              <option value="General_Knowledge">General Knowledge</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              There was a problem generating questions. Try different settings.
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            Play
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
