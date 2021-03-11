const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
// const instructionBox = document.querySelector('.instruction');


let continent = input.value;

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
      console.log(data);
      // form.style.visibility = 'hidden';
      // instructionBox.style.visibility = 'visible';
    }
  }
  // 0: {number: 1, question: "https://restcountries.eu/data/cpv.svg", answer: "Praia", options: Array(4)}
  // 1: {number: 2, question: "https://restcountries.eu/data/caf.svg", answer: "Bangui", options: Array(4)}
  // 2: {number: 3, question: "https://restcountries.eu/data/tcd.svg", answer: "N'Djamena", options: Array(4)}
  // 3: {number: 4, question: "https://restcountries.eu/data/com.svg", answer: "Moroni", options: Array(4)}
  // 4: {number: 5, question: "https://restcountries.eu/data/cog.svg", answer: "Brazzaville", options: Array(4)}
 

  getapi(`http://localhost:8080/api/?continent=${continent}`);

  input.value = '';
});
