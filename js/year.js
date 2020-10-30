const handleYearChange = () => {
  let year = document
    .getElementById("year")
    .value;
  if (!!!year) 
    return;
  year = parseInt(year);
  validateYear(year);
}

const validateYear = (year) => {
  if (isNaN(year) || year < 1000 || year > 3000 || !!!year) {
    document
      .getElementById("year-error")
      .style
      .display = "block";
    document
      .getElementById("update-btn")
      .setAttribute("disabled", "disabled");
    return false;
  } else {
    document
      .getElementById("year-error")
      .style
      .display = "none";
    document
      .getElementById("update-btn")
      .removeAttribute("disabled");
  }
  return true;
}