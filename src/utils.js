export const toDateString = milliseconds => {
  var time = new Date(milliseconds);

  var theyear = time.getFullYear();
  var themonth = time.getMonth() + 1;
  var theday = time.getDate();
  var thehour = pad(time.getHours());
  var theminutes = pad(time.getMinutes());

  return `${theyear}/${themonth}/${theday}, ${thehour}:${theminutes}`;
};

export const highestDecimal = (x, y) => {
  return {
    x: x - (x % 10) + 10,
    y: y - (y % 10) + 10
  };
};
export const lowestDecimal = (x, y) => {
  return {
    x: x - (x % 10),
    y: y - (y % 10)
  };
};

const pad = number => (number < 10 ? `0${number}` : number);
