$('.ui.dropdown')
  .dropdown()
;

function displayTodaysDate(){
    let today = new Date()
    let t = document.querySelector("#today");
    t.textContent = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
}

displayTodaysDate();
