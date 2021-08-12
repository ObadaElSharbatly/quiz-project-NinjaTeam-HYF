'use strict';

import {
  QUESTION_CONTAINER_ID,
  NEXT_QUESTION_BUTTON_ID,
} from '../constants.js';
import {
  createQuestionElement
} from '../views/questionViews.js';
import {
  clearDOMElement,
  getDOMElement
} from '../utils/DOMUtils.js';
import {
  quizData
} from '../data.js';
import {
  nextQuestion
} from '../listeners/questionListeners.js';
import {
  activateTimerFn
} from '../views/timer.js';
import { changeButtonText, showFinalResultFn } from '../handlers/finalResult.js';

//the showCurrentQuestion function will push the current question to the screen and activate the timer.
export const showCurrentQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionDOM = createQuestionElement(currentQuestion);

  const questionContainer = getDOMElement(QUESTION_CONTAINER_ID);
  questionContainer.classList.add('container');
  clearDOMElement(questionContainer);
  questionContainer.appendChild(questionDOM);
  activateTimerFn();
};

//the handleNextQuestion function will upgrade the currentQuestion index, to show what question will be executed
//stop the nextQuestion button from working until the user select any answer, and call the function to show the current question.
export const handleNextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  nextQuestionButton.removeEventListener('click', nextQuestion);
  if (quizData.currentQuestionIndex === quizData.questions.length -1) {
    //showCurrentQuestion();
    changeButtonText();
  }
  showCurrentQuestion();
  // here we write code for the final page score and define the restart button
  /* else if (quizData.currentQuestionIndex === quizData.questions.length) {
    showFinalResultFn();
    } else {
    showCurrentQuestion();
  } */
};