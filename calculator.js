window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loanAmountBox = document.getElementById("loan-amount");
  const loanYearsBox = document.getElementById("loan-years");
  const loanRateBox = document.getElementById("loan-rate");

  loanAmountBox.value = 0;
  loanYearsBox.value = 1;
  loanRateBox.value = 0.1;

  updateMonthly(
    calculateMonthlyPayment({
      amount: loanAmountBox.value,
      years: loanYearsBox.value,
      rate: loanRateBox.value,
    })
  );
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
  if (getCurrentUIValues().rate > 1) {
    alert(
      "A rate greater than 1 was entered; operating on the assumption it was meant to be a percentage."
    );
  }
  if (getCurrentUIValues().years <= 1 / 12) {
    alert(
      "Entered time is a month or less; the loan must be repaid in full the first month."
    );
  }
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  // Sanity check for rate
  if (values.rate > 1) {
    values.rate = values.rate / 100;
  }

  // If time is too short, pay back the whole loan at once
  if (values.years <= 1 / 12) {
    return values.amount.toFixed(2);
  }
  let payment =
    (values.amount * values.rate) /
    12 /
    (1 - Math.pow(1 + values.rate / 12, -12 * values.years));
  return payment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = "$" + monthly;
}
