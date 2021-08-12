import { getDOMElement } from '../utils/DOMUtils.js';
import { nextQuestion } from '../listeners/questionListeners.js';
import { quizData } from '../data.js';
import { showFinalResultFn } from '../handlers/finalResult.js';

// Timer function
export const timerEl = getDOMElement('timer');
export let activateTimer;

// activate timer function.
export const activateTimerFn = () => {
  // when we active the timer for each question we need to make 
  timerEl.textContent = quizData.questions[quizData.currentQuestionIndex].timer;
  activateTimer = window.setInterval(counterTimer, 1000);
};

// deactivate timer function.
export const deactivateTimerFn = () => {
  clearInterval(activateTimer);
};

export let counterTimer = () => {
  let timerNumber = parseFloat(timerEl.textContent);
  if (quizData.currentQuestionIndex === quizData.questions.length -1 && timerNumber <= 0) {
    showFinalResultFn();
  }
  if (timerNumber > 0) {
    timerEl.textContent = timerNumber - 1;
  } 
  else {
    // go to next question and deactivate the last timer.
    deactivateTimerFn();
    nextQuestion();
  }
};
