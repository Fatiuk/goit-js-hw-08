// Add imports above this line
import throttle from 'lodash.throttle';

// Work with code below this line
const formElement = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

// Save information in localStorage
function onFormInput(event) {
  let formData = localStorage.getItem(FORM_KEY);
  formData = formData ? JSON.parse(formData) : {};
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

// Return information from localStorage to input.value
function formDataAssembler() {
  let savedFormData = localStorage.getItem(FORM_KEY);

  if (savedFormData) {
    savedFormData = JSON.parse(savedFormData);
    Object.entries(savedFormData).forEach(([key, text]) => {
      formElement.elements[key].value = text || '';
    });
  }
}

formDataAssembler();

function onFormSubmit(event) {
  event.preventDefault();
  //Object Destructuring
  const {
    elements: { email, message },
  } = event.currentTarget;

  // Clear inputForm, remove info from localStorage and add empty object
  if (email.value === '' || message.value === '') {
    alert('Please provide information for all fields!');
  } else {
    let parsedFormData = JSON.parse(localStorage.getItem(FORM_KEY));
    console.log(parsedFormData);

    event.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
    parsedFormData = {};
  }
}

formElement.addEventListener('input', throttle(onFormInput, 500));
formElement.addEventListener('submit', onFormSubmit);
