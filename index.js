const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const instructionBox = document.querySelector('.instruction');
const exitButton = document.querySelector('.instruction__buttons--exit');
const continueButton = document.querySelector('.instruction__buttons--continue');
const quizContainer = document.querySelector('.container');
const nextButton = document.querySelector('.footer__button');
const resultScore = document.querySelector('.footer__text');

let continent = input.value;
let questionCount = 0;

input.addEventListener('input', event => {
  continent = event.target.value;
});

form.addEventListener('submit', event => {
  event.preventDefault();

  async function getapi(url) {
    const response =  await fetch(url);
    const data =  await response.json();
    if(data[0].status === 'error'){
      alert('"Please enter a continent"');
      return;
    } else {
      instructionBox.classList.add('instruction__active');
      console.log(data);
      continueButton.addEventListener('click', () => {
        instructionBox.classList.remove('instruction__active');
        quizContainer.classList.add('container__active');
        displayQuestions(data, questionCount);
      });
      nextButton.addEventListener('click', () => {
        if(questionCount < data.length -1){
          questionCount += 1;
          displayQuestions(data, questionCount);
        } else {

          console.log('no more questions');
        }
        
      }) 
      
    }
  }
 

  getapi(`http://localhost:8080/api/?continent=${continent}`);

  input.value = '';
});

exitButton.addEventListener('click', () => {
  instructionBox.classList.remove('instruction__active');
});


const displayQuestions = (fetchedData, index) => {
  const questionImg = document.querySelector('.question__img');
  const questionOptions = document.querySelector('.question__options');
  let flag = `<img src=${fetchedData[questionCount].question}>`;
  let option = 
  `<article class="option"><li>${fetchedData[questionCount].options[0]}</li></article>
   <article class="option"><li>${fetchedData[questionCount].options[1]}</li></article>
   <article class="option"><li>${fetchedData[questionCount].options[2]}</li></article>
   <article class="option"><li>${fetchedData[questionCount].options[3]}</li></article>`;
  questionImg.innerHTML = flag;
  questionOptions.innerHTML = option;

  let questionNumber =  `<span><p>${fetchedData[questionCount].number}</p> of <p>${fetchedData.length}</p> Questions</span>`
  resultScore.innerHTML = questionNumber;
}


