it("should calculate the monthly rate correctly", function () {
  expect(
    calculateMonthlyPayment({ amount: 5000, years: 1, rate: 0.1 })
  ).toEqual("439.58");
  expect(calculateMonthlyPayment({ amount: 5000, years: 1, rate: 10 })).toEqual(
    "439.58"
  );
  expect(calculateMonthlyPayment({ amount: 0, years: 1, rate: 0.1 })).toEqual(
    "0.00"
  );
  expect(calculateMonthlyPayment({ amount: 1, years: 0, rate: 0.1 })).toEqual(
    "1.00"
  );
});

it("should return a result with 2 decimal places", function () {
  expect(
    calculateMonthlyPayment({
      amount: Math.ceil(Math.random() * 5000),
      years: Math.ceil(Math.random() * 10),
      rate: Math.random(),
    })
  ).toMatch("\\d?\\.\\d\\d$");
});

/// etc
