var geocode = JSON.parse(document.getElementById("data").dataset.geocode);
var testdata = geocode.data_list;

const btn = document.querySelector('#btn');
btn.onclick = () => alert(testdata);



new fullpage('#fullpage', {
    autoScrolling: true
    
});


fullpage_api.setAllowScrolling(false);


const btn1 = document.querySelector('#btn1');
btn.onclick = () => fullpage_api.moveSectionDown();

const btn2 = document.querySelector('#btn2');
btn2.onclick = () => fullpage_api.moveSectionUp();