const form = document.querySelector('.form');
const input = document.querySelector('.form__input');

let continent = input.value;

input.addEventListener('input', event => {
  continent = event.target.value;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  async function getapi(url) {
    const response =  await fetch(url);
    const data =  await response.json();
    console.log(data);
  }
  getapi(`http://localhost:8080/api/?continent=${continent}`);

  input.value = '';
});
