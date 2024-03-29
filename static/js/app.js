new fullpage('#fullpage', {
    autoScrolling: true,
    onLeave: (origin, destination, direction) => {
        document.body.classList.add('bg-active');
        const section = destination.item;
        const title = section.querySelector("h1");
        const tl = new TimelineMax({
            delay: 1
        });
        tl.fromTo(title, 1.5, {
            y: "50",
            opacity: 0
        }, {
            y: 0,
            opacity: 1
        });
    }
});

//Fullpage settings 
fullpage_api.setScrollingSpeed(2000);
fullpage_api.setAllowScrolling(false);

//Queries 
//const btn = document.querySelector('#databtn');
const btn2 = document.querySelector('#btn2');
const table = document.querySelector('#top_table');
const table1 = document.querySelector('#low_table');
let canvas1 = document.getElementById('chart').getContext('2d');
let canvas3 = document.getElementById('canvas3').getContext('2d');
let geocode = JSON.parse(document.getElementById("data").dataset.geocode);

//Collects analysis data passed to index from flask
//var tweet_data = geocode.data_list; 
let search_state = geocode.current_state;
let tweets = geocode.tweet_data;
let tweet_arr = Object.values(tweets);
let tweet_sentiment_values = [];
let low_values = [];
let high_values = [];

//For loop that takes the sentiment value
for (i = 0; i < tweet_arr.length; i++) {
    tweet_sentiment_values.push(tweet_arr[i][2]);
}

//Clause that triggers move if a search has been made
if (search_state == 1) {
    fullpage_api.moveSectionDown();
    tweet_arr.sort(sortFunction);
    calcTopValues();
}

//Eventhandlers for buttons
btn2.onclick = () => goAgain();
//btn.onclick = () => alert(tweet_sentiment_values);

//Functions  
function goAgain() {
    document.body.classList.add('bg-blue');
    fullpage_api.moveSectionUp()
}

function countAmount(input) {
    let categories = [0, 0, 0];
    for (let index = 0; index < input.length; index++) {
        if (input[index] >= 0.05) {
            categories[2]++;
        } else if (input[index] > -0.05) {
            categories[1]++;
        } else if (input[index] <= -0.05) {
            categories[0]++;
        }
    }
    return categories;
}

function sortFunction(a, b) {
    if (a[2] === b[2]) {
        return 0;
    } else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function calcTopValues() {

    let counts = 0;

    for (i = 0; i < 5; i++) {
        low_values.push(tweet_arr[i]);
    }

    for (i = tweet_arr.length - 1; counts < 5; i--) {
        high_values.push(tweet_arr[i]);
        counts++;
    }
}

//Charts
let canvas_chart1 = new Chart(canvas1, {
    type: 'bar',
    data: {
        labels: tweet_sentiment_values.map(String),
        datasets: [{
            //label: 'Excerpt of tweet values',
            data: tweet_sentiment_values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 4500,
        },
        plugins: {
            title: {
                display: true, 
                text: 'Excerpt of tweet values' 
            }, 
            legend: {
                display: false
            } 
        }
    }
})

let canvas_chart3 = new Chart(canvas3, {
    type: 'doughnut',
    data: {
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [{
            label: 'Numbers',
            data: countAmount(tweet_sentiment_values),
            backgroundColor: [
                'rgba(255, 0, 0, 0.6)',
                'rgba(255, 191, 0, 0.6)',
                'rgba(0, 255, 64, 0.6)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 4500,
        }
    }
})



//For loop that calculates top positive comments
for (let index = high_values.length - 1; index >= 0; index--) {

    let row = table.insertRow(0);   
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = high_values[index][0];
    cell2.innerHTML = high_values[index][2]; 
}

//For loop that calculates top negative comments
for (let index = low_values.length - 1; index >= 0; index--) {

    let row = table1.insertRow(0);   
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = low_values[index][0];
    cell2.innerHTML = low_values[index][2]; 
}