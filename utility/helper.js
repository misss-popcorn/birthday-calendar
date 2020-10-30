const isDateValid = dateString => {
  // First check for the pattern
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) 
    return false;
  
  // Parse the date parts to integers
  let parts = dateString.split("/");
  let day = parseInt(parts[1], 10);
  let month = parseInt(parts[0], 10);
  let year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) 
    return false;
  
  let monthLength = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) 
    monthLength[1] = 29;
  
  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

const getInitialsFromName = (name) => {
  var initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
}

const getColor = () => {
  return "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (75 + 10 * Math.random()) + '%)'
}
