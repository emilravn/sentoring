



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
	
var currentURL = window.location.href;
fullpage_api.setAllowScrolling(false);



const btn1 = document.querySelector('#btn');
btn1.onclick = () => enterSearch();

const btn2 = document.querySelector('#btn2');
btn2.onclick = () => goAgain();

var geocode = JSON.parse(document.getElementById("data").dataset.geocode);
var testdata = geocode.data_list; 
var test2 = geocode.current_state;

const btn = document.querySelector('#databtn');
btn.onclick = () => alert(testdata);

const btn22 = document.querySelector('#btn22');
btn22.onclick = () => enterSearch();


if (test2 == 1){
    fullpage_api.moveSectionDown();
}


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function waitFunc() {

    let count = 0;

    await sleepNow(7000)
    fullpage_api.moveSectionDown();
  /*
    if (currentURL == "http://127.0.0.1:5000/test2#") {
        
        alert(count);
        count++;
    }
*/
/*
    await sleepNow(3000)
    if (currentURL == "http://127.0.0.1:5000/test2#") {
        alert(count);
        count++;
    }

    await sleepNow(3000)
    if (currentURL == "http://127.0.0.1:5000/test2#") {
        alert(count);
        count++;
    } else {
        alert("no");
    }
*/
}



let dict = {};


function countData(input) { 
    

    for (let index = 0; index < input.length; index++) {
        if (dict[input[index]] == null) {
            dict[input[index]] = 1;
        
        } else {
            dict[input[index]]++;
        }
        
    }

}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


let stringArray = testdata.map(String)

function countAmount(input) {
    let categories = [0, 0, 0]; 
    let categories_labels = ["Negative", "Neutral", "Positive"]; 
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



/*

def presentData(self):
categories = [0, 0, 0]
categories_labels = ['Negative', 'Neutral', 'Positive']
explode = (0.1, 0.1, 0.1)

for t in self.__tweet_sentiment_score:
    print(t)
    if t >= 0.05:
        categories[2] += 1
    elif t > -0.05 and t < 0.05:
        categories[1] += 1
    elif t <= -0.05:
        categories[0] += 1




*/











let chart = document.getElementById('chart').getContext('2d'); 
//chart.canvas.width = 200;
//chart.canvas.height= 200;
let valueChart = new Chart(chart, {
    type: 'bar', 
    data: {
        labels: stringArray, 
        datasets: [{
            //label: 'Numbers',
            data: testdata, 
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








let canvas2 = document.getElementById('canvas2').getContext('2d'); 
//chart.canvas.width = 200;
//chart.canvas.height= 200;
let canvaschart2 = new Chart(canvas2, {
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

let canvas3 = document.getElementById('canvas3').getContext('2d'); 
//chart.canvas.width = 200;
//chart.canvas.height= 200;
let canvaschart3 = new Chart(canvas3, {
    type: 'doughnut', 
    data: {
        labels: ['Negative', 'Neutral', 'Positive'], 
        datasets: [{
            label: 'Numbers',
            data: countAmount(testdata), 
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

















/*

let chart2 = document.getElementById('chart2').getContext('2d'); 
//chart2.canvas.width = 200;
//chart2.canvas.height= 200;
let valueChart = new Chart(chart2, {
    type: 'bar', 
    data: {
        labels: ['one', 'two', 'three', 'four'], 
        datasets: [{
            label: 'Numbers',
            data: [1, 2, 3, 4]
        }]
    }, 
    options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
            duration: 2500, 
        }
    }
})

*/


function goAgain() {
    fullpage_api.moveSectionUp()

}

function enterSearch() { 

    //sleepNow(5000);
    //waitFunc();
    //fullpage_api.moveSectionDown();


    
}


