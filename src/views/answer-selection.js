import { quizData } from '../data.js';
import { getDOMElement } from '../utils/DOMUtils.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { nextQuestion } from '../listeners/questionListeners.js';
import { deactivateTimerFn } from '../views/timer.js';
import { showFinalResultFn } from '../handlers/finalResult.js';

const scoreEl = getDOMElement('score');
scoreEl.textContent = 0;

// this function works when you choose any answer >>

export const checkAnswer = function selectedAnswer() {
  // deactivating timer if we select any answer.
  deactivateTimerFn();
  // here we delete the class that when we hove make a black background from the selected answer
  this.classList.remove('answer-button');
  // activating the next question button after choosing:
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  nextQuestionButton.addEventListener('click', nextQuestion);
  if (quizData.currentQuestionIndex === quizData.questions.length -1) {
    showFinalResultFn();
  }
  // targeting the answers buttons to work on it:
  const buttonsCon = this.parentElement.parentElement;
  const answerButtons = buttonsCon.querySelectorAll('button');

  if (this.id === quizData.questions[quizData.currentQuestionIndex].correct) {
    this.classList.add('correct-answer');
    answerButtons.forEach((button) =>
      button.removeEventListener('click', checkAnswer)
    );
    return (scoreEl.textContent = parseFloat(scoreEl.textContent) + 100);
  } else {
    this.classList.add('wrong-answer');
    const correct = quizData.questions[quizData.currentQuestionIndex].correct;

    /* forEach button if it's id = the correct answer letter (ex: "c") it give correct-answer class to the button
    and in all situations it removes the Event listener. And the answer will have a green background-color if is right, add 100 points to the score and if the answer is wrong will have a red background-color and will lose 50 points*/

    answerButtons.forEach((element) =>
      element.id == correct
        ? element.classList.add('correct-answer') &&
          element.removeEventListener('click', checkAnswer)
        : element.removeEventListener('click', checkAnswer)
    );
    return (scoreEl.textContent = parseFloat(scoreEl.textContent) - 50);
  }
};
