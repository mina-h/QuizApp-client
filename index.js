const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const instructionBox = document.querySelector('.instruction');
const exitButton = document.querySelector('.instruction__buttons--exit');
const continueButton = document.querySelector('.instruction__buttons--continue');
const quizContainer = document.querySelector('.container');

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
      
    }
  }
 

  getapi(`http://localhost:8080/api/?continent=${continent}`);

  input.value = '';
});

// exitButton.addEventListener('click', () => {
//   instructionBox.classList.remove('active');
// })
exitButton.addEventListener('click', () => {
  instructionBox.classList.remove('instruction__active');
});

// continueButton.addEventListener('click', () => {
//   instructionBox.classList.remove('instruction__active');
//   quizContainer.classList.add('container__active');

// });

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

}