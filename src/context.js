import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  General_Knowledge: 9,
  Entertainment_Books: 10,
  Entertainment_Film: 11,
  Entertainment_Music: 12,
  Entertainment_Television: 14,
  Entertainment_Video_Games: 15,
  Science_Computers: 18,
  Mythology: 20,
  Art: 25,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctQuestion, setCorrectQuestion] = useState(0);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "Entertainment_Film",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      const data = response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;

      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrectQuestion((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrectQuestion(0);
    setModal(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correctQuestion,
        error,
        modal,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
