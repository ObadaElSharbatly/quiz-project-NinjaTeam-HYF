import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { getDOMElement } from '../utils/DOMUtils.js';

export const changeButtonText = ()=> {
  const endButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  endButton.textContent = "Result";
}

export const showFinalResultFn = ()=> {
    
    const resultButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);

    // here we hide the timer and target the question container (main-wrapper)
    const timer2 = getDOMElement('btn-3');
    const questionsSection = getDOMElement('main-wrapper');
    const starterEl2 = getDOMElement('starter');

    // target score text and change it
    const scoreButton = getDOMElement('btn-2');
    const scoreText = scoreButton.querySelector('a');
    const scoreSpan = getDOMElement('score').textContent;

    // target restart-button 
    const restartButton = getDOMElement('re-starter');

    // here we hide the question-container if we click the result button.
    const hideContainer = () => {
      timer2.classList.add('hide');
      starterEl2.classList.add('hide');
      questionsSection.classList.add('hide');
      scoreButton.classList.add('centered');
      restartButton.classList.remove('hide');
      resultButton.classList.add('hide');
      restartButton.style.marginLeft = 'auto';
      restartButton.style.marginRight = 'auto';
      
      scoreText.innerText = `Your Final Score is : ${scoreSpan}`;
    };
    resultButton.addEventListener('click', hideContainer);
}