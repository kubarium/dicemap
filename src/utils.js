export const toDateString = (milliseconds) => {
    var time = new Date(milliseconds);

    var theyear = time.getFullYear();
    var themonth = time.getMonth() + 1;
    var theday = time.getDate();
    var thehour = pad(time.getHours());
    var theminutes = pad(time.getMinutes())


    return `${theyear}/${themonth}/${theday}, ${thehour}:${theminutes}`;
}

const pad = (number) => number < 10 ? `0${number}` : number