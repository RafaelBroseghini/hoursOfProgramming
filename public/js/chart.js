let ctx = document.getElementById('myChart').getContext('2d');
let langs = []
let hrs = []
let languages = document.querySelectorAll(".language")
let hours = document.querySelectorAll(".hours")

for (let i = 0; i < languages.length; i++) {
    langs.push(languages[i].textContent)
    hrs.push(hours[i].textContent)
}

let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: langs,
        datasets: [{
            label: "Hours/Language",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: hrs,
        }]
    },

    // Configuration options go here
    options: {}
});