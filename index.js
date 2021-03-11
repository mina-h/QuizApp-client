const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const instructionBox = document.querySelector('.instruction');


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
      form.style.visibility = 'hidden';
      instructionBox.style.visibility = 'visible';
    }
  }

  getapi(`http://localhost:8080/api/?continent=${continent}`);

  input.value = '';
});
