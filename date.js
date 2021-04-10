
// dating

const date = document.querySelector('#date');
console.log(date);

var months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getday = () => {

    let currentTime = new Date();
    let currentDate = currentTime.getUTCDate();
    let currentYear = currentTime.getFullYear();
    // console.log(currentYear);
    let currentMonth = months[currentTime.getMonth()];
    date.innerHTML = currentDate +'-'+ currentMonth + '-' + currentYear;

}
getday();

//dating end 

