const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const instructionBox = document.querySelector('.instruction');
const exitButton = document.querySelector('.instruction__buttons--exit');
const continueButton = document.querySelector('.instruction__buttons--continue');
const quizContainer = document.querySelector('.container');
const nextButton = document.querySelector('.footer__button');
const resultScore = document.querySelector('.footer__text');
const timerCount = document.querySelector('.header__timer--seconds');
const result = document.querySelector('.results');
const resultText = document.querySelector('.result__score');
const quit = document.querySelector('.result__buttons--quit');


let continent = input.value;
let questionCount = 0;
let points = 0;
let counter;

const startTimer = (time, dataa, i) => {
  counter = setInterval(timer, 700);
  function timer() {
    timerCount.textContent = time;
    time --;
    if(time < 0) {
      clearInterval(counter);
      timerCount.textContent = '00';
      let correctAnswer = dataa[i].answer;
      const questionOptions = document.querySelector('.question__options');
      const optionItemArray = Array.from(questionOptions.querySelectorAll('.option'));
      optionItemArray.forEach(e => {
        if (e.textContent === correctAnswer) {
          e.classList.add('option__correct');
        }
      });
      optionItemArray.forEach(e => {
        e.classList.add('option__disabled');
      });
      nextButton.style.display = 'block';


    }
  }
}


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
        startTimer(10, data, questionCount);
      });
      nextButton.addEventListener('click', () => {
        if(questionCount < data.length -1){
          questionCount += 1;
          displayQuestions(data, questionCount);
          clearInterval(counter);
          startTimer(10, data,questionCount);
          nextButton.style.display = 'none';

        } else {
          clearInterval(counter);
          instructionBox.classList.remove('instruction__active');
          quizContainer.classList.remove('container__active');
          result.classList.add('result__active');
          if (points > 3) {
            let text = `<span class="result__score--text">Yeayyy you got ${points} out of 5 🏆 </span>`
            resultText.innerHTML = text;
          } else {
            let text = `<span class="result__score--text">Oo Oo you got only ${points} out of 5 🥔</span> `
            resultText.innerHTML = text;
          }
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
  console.log(fetchedData);
  const questionImg = document.querySelector('.question__img');
  const questionOptions = document.querySelector('.question__options');
  let flag = `<img src=${fetchedData[index].question}>`;
  let option = 
  `<article class="option"><li>${fetchedData[index].options[0]}</li></article>
   <article class="option"><li>${fetchedData[index].options[1]}</li></article>
   <article class="option"><li>${fetchedData[index].options[2]}</li></article>
   <article class="option"><li>${fetchedData[index].options[3]}</li></article>`;
  questionImg.innerHTML = flag;
  questionOptions.innerHTML = option;
  const optionItemArray = Array.from(questionOptions.querySelectorAll('.option'));
  
  optionItemArray.forEach(e => {
    // nice discovery :D
    e.onclick = function() {
      clearInterval(counter);
      nextButton.style.display = 'block';

      let userAnswer = this.textContent;
      let correctAnswer = fetchedData[index].answer;
      if (userAnswer === correctAnswer){
        this.classList.add('option__correct');
        this.classList.add('tick');

        points += 1;
        e.classList.add('option__disabled');
        console.log('correct');
        optionItemArray.forEach(e => {
          e.classList.add('option__disabled');
          })
      } else {
        this.classList.add('option__incorrect');
        this.classList.add('cross');
        console.log('wrong answer');
        optionItemArray.forEach(e => {
          e.classList.add('option__disabled');
          })
        optionItemArray.forEach(e => {
          if(e.textContent === correctAnswer){
            e.classList.add('option__correct');
          }
        })
      }
    }
  });
 
  let questionNumber =  `<span><p>${fetchedData[index].number}</p> of <p>${fetchedData.length}</p> Questions</span>`
  resultScore.innerHTML = questionNumber;
}


quit.onclick = () => {
  window.location.reload();
}




