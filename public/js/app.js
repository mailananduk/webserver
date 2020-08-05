console.log('inside style.js')

fetch("http://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherInfo = (forLocation) => fetch("/weather?city=" + forLocation).then((response)=>{
    response.json().then((data) => {
        if(data.error) {
            console.log(`Unable to get weather info, error: ${data.error}`);
            paraMessage1.textContent = `Unable to get weather info, error: ${data.error}`;
        } else {
            console.log(data.description);
            console.log(data.temperature);
            console.log(data.city);
            paraMessage1.textContent = `Description:${data.description}, Temperature: ${data.temperature} C, Feel like: ${data.feelsLike} C`;
            paraMessage2.textContent = 'City:' + data.city.toUpperCase();
        }
    })
})

const frmWeather = document.getElementById('frmWeather');
const txtLocation = document.getElementById('txtLocation');
const paraMessage1 = document.getElementById('paraMessage1');
const paraMessage2 = document.querySelector('#paraMessage2');

frmWeather.addEventListener("submit", function (e) {
    e.preventDefault();
    paraMessage1.textContent = 'Loading...';
    paraMessage2.textContent = '';
    const location = txtLocation.value;
    // if(location.length === 0) {
    //     return console.log('please enter city value')
    // }
    weatherInfo(location);
});