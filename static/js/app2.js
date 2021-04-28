
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



const btn1 = document.querySelector('#btn');
//btn1.onclick = () => enterSearch();

const btn2 = document.querySelector('#btn2');
btn2.onclick = () => goAgain();

var geocode = JSON.parse(document.getElementById("data").dataset.geocode);
var testdata = geocode.data_list; 
var test2 = geocode.current_state;

const btn = document.querySelector('#databtn');
btn.onclick = () => alert(testdata);

const btn22 = document.querySelector('#btn22');
//btn22.onclick = () => enterSearch();


if (test2 == 1){
    fullpage_api.moveSectionDown();
}



let stringArray = testdata.map(String)

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





function goAgain() {
    fullpage_api.moveSectionUp()

}



