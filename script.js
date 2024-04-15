
const taxForm = document.getElementById('tax-form');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const taxAmountDisplay = document.getElementById('tax-amount');

taxForm.addEventListener('submit', handleSubmit);
closeModalBtn.addEventListener('click', closeModal);

function handleSubmit(event) {
  event.preventDefault();

  const grossIncome = parseFloat(document.getElementById('gross-income').value);
  const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  const age = document.getElementById('age').value;

  // Clear any previous errors
  const errorIcons = document.querySelectorAll('.error-icon');
  errorIcons.forEach(icon => icon.style.display = 'none');

  // Validate input
  let isValid = true;
  if (isNaN(grossIncome)) {
    showError(document.getElementById('gross-income'), 'Please enter a valid number');
    isValid = false;
  }
  if (isNaN(extraIncome) || extraIncome < 0) {
    showError(document.getElementById('extra-income'), 'Please enter a valid non-negative number');
    isValid = false;
  }
  if (isNaN(deductions) || deductions < 0) {
    showError(document.getElementById('deductions'), 'Please enter a valid non-negative number');
    isValid = false;
  }
  if (!age) {
    showError(document.getElementById('age'), 'Please select your age group');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const taxableIncome = Math.max(0, grossIncome + extraIncome - deductions - 800000);
  let taxRate;
  if (age == "<40") {
    taxRate = 0.3;
  } else if (age == ">=40 && <60") {
    taxRate = 0.4;
  } else {
    taxRate = 0.1;
  }
  console.log(taxRate)
  console.log(taxableIncome)
  const tax = taxableIncome * taxRate;
  
//   console.log(tax)
//   console.log(age)

  taxAmountDisplay.textContent = `Tax amount: ${tax.toFixed(2)} Rupees`;
  openModal();
}

function showError(input, message) {
  const errorIcon = input.nextElementSibling;
  errorIcon.textContent = message;
  errorIcon.style.display = 'inline-block';
}

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}


