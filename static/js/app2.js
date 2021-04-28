
new fullpage('#fullpage', {
    autoScrolling: true,
    onLeave: (origin, destination, direction) => {
        const section = destination.item; 
        const title = section.querySelector("h1"); 
        const tl = new TimelineMax({delay: 1}); 
        tl.fromTo(title, 1.5, {y: "50", opacity: 0}, {y: 0, opacity: 1});
    }
});

fullpage_api.setScrollingSpeed(2000);
fullpage_api.setAllowScrolling(false);


//Queries 
const btn2 = document.querySelector('#btn2');
const btn = document.querySelector('#databtn');
let canvas1 = document.getElementById('chart').getContext('2d'); 
let canvas2 = document.getElementById('canvas2').getContext('2d'); 
let canvas3 = document.getElementById('canvas3').getContext('2d'); 
var geocode = JSON.parse(document.getElementById("data").dataset.geocode);

//Collects analysis data passed to index from flask
var tweet_data = geocode.data_list; 
var search_state = geocode.current_state;

//Clause that triggers move if a search has been made
if (search_state == 1){
    fullpage_api.moveSectionDown();
}

//Eventhandlers for buttons
btn2.onclick = () => goAgain();
btn.onclick = () => alert(tweet_data);

//Functions  
function goAgain() {
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

//Charts
let canvas_chart1 = new Chart(canvas1, {
    type: 'bar', 
    data: {
        labels: tweet_data.map(String), 
        datasets: [{
            //label: 'Numbers',
            data: tweet_data, 
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
        }
    }
})

let canvas_chart2 = new Chart(canvas2, {
    type: 'radar', 
    data: {
        labels: ['one', 'two', 'three', 'four'], 
        datasets: [{
            label: 'Numbers',
            data: [1, 2, 3, 4], 
            backgroundColor:[
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
        }
    }
})

let canvas_chart3 = new Chart(canvas3, {
    type: 'doughnut', 
    data: {
        labels: ['Negative', 'Neutral', 'Positive'], 
        datasets: [{
            label: 'Numbers',
            data: countAmount(tweet_data), 
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







