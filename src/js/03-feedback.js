import throttle from 'lodash.throttle';

let formData = {};

const inputFormEl = document.querySelector('.feedback-form');

inputFormEl.addEventListener('input', throttle(onFormInput, 500));
inputFormEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  saveToLs('feedback-form-state', formData);
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!formData.email) {
    alert('Заповніть всі поля форми');
    return;
  }

  if (!formData.message) {
    alert('Заповніть всі поля форми');
    return;
  }
  console.log(formData);

  e.target.reset();
  localStorage.clear();
  formData = {};
}

function saveToLs(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

function loadFromLs(key) {
  let data = localStorage.getItem(key);
  return JSON.parse(data);
}

function onLoadPage() {
  formData = loadFromLs('feedback-form-state') || {};
  inputFormEl.elements.email.value = formData.email || '';
  inputFormEl.elements.message.value = formData.message || '';
}

onLoadPage();
