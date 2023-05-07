const form = document.querySelector('.form');
const age = document.querySelector('.your-age');
const numberOfYears = document.querySelector('#years');
const numberOfMonths = document.querySelector('#months');
const numberOfDays = document.querySelector('#days');

const currentDate = new Date();

const validateForm = () => {
  const year = document.querySelector('#year').value;
  const month = document.querySelector('#month').value;
  const day = document.querySelector('#day').value;

  if(year === '' || month === '' || day === ''){
    const errorMessage = '<p class="error">Fill in all the inputs</p>';
    const errorElement = document.createElement('div');
    errorElement.innerHTML = errorMessage;
    errorMessage.style.color = 'hsl(0, 100%, 67%)';
    const errorInputs = document.querySelectorAll('input');
    errorInputs.forEach(input => {
      input.style.borderColor = 'hsl(0, 100%, 67%)';
    });
    return errorElement;
  }  

  if (new Date(year, month - 1, day) > currentDate) {
    const errorMessage = '<p class="error">Date cannot be in the future.</p>';
    const errorElement = document.createElement('div');
    errorElement.innerHTML = errorMessage;
    const errorInput = document.querySelector('#day');
    errorMessage.style.color = 'hsl(0, 100%, 67%)';
    errorInput.style.borderColor = 'hsl(0, 100%, 67%)';
    return errorElement;
  }

  if (month < 1 || month > 12) {
    const errorMessage = '<p class="error">Invalid month input.</p>';
    const errorElement = document.createElement('div');
    errorElement.innerHTML = errorMessage;
    const errorInput = document.querySelector('#month');
    errorMessage.style.color = 'hsl(0, 100%, 67%)';
    errorInput.style.borderColor = 'hsl(0, 100%, 67%)';
    return errorElement;
  }

  if (day < 1 || day > 31) {
    const errorMessage = '<p class="error">Invalid days input.</p>';
    const errorElement = document.createElement('div');
    errorElement.innerHTML = errorMessage;
    const errorInput = document.querySelector('#day');
    errorMessage.style.color = 'hsl(0, 100%, 67%)';
    errorInput.style.borderColor = 'hsl(0, 100%, 67%)';
    return errorElement;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validationError = validateForm();

  if (validationError) {
    // Display the error message
    document.querySelector('.error-message').innerHTML = validationError.innerHTML;
    return;
  }

  const year = document.querySelector('#year').value;
  const month = document.querySelector('#month').value;
  const day = document.querySelector('#day').value;

  const specificDate = new Date(year, month - 1, day);

  const differenceInMs = currentDate - specificDate;

  const yearsSinceSpecificDate = differenceInMs / (1000 * 60 * 60 * 24 * 365);
  const roundedYears = Math.floor(yearsSinceSpecificDate);

  const remainingDifferenceInMs = differenceInMs - roundedYears * (1000 * 60 * 60 * 24 * 365);
  const monthsSinceSpecificDate = remainingDifferenceInMs / (1000 * 60 * 60 * 24 * 30);
  const roundedMonths = Math.floor(monthsSinceSpecificDate);

  const remainingDifferenceInMs2 = remainingDifferenceInMs - roundedMonths * (1000 * 60 * 60 * 24 * 30);
  const daysSinceSpecificDate = remainingDifferenceInMs2 / (1000 * 60 * 60 * 24);
  const roundedDays = Math.floor(daysSinceSpecificDate);

  numberOfYears.innerText = roundedYears;
  numberOfMonths.innerText = roundedMonths;
  numberOfDays.innerText = roundedDays;

  // Clear any previous error messages
  document.querySelector('.error-message').innerHTML = '';
  form.reset();
});
