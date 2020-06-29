console.log('Im a client-side JS');


const weatherForm = document.querySelector('form');
let errorElement;
let forecast;

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let form = event.target;


    let location = form.querySelector('input').value;

    if (location && form.parentNode.contains(errorElement)) {
        errorElement.remove();
    }

    errorElement = document.createElement('p');
    errorElement.textContent = 'Please provide an location';
    errorElement.className = 'asterisk';

    if (!location) {
        form.parentNode.insertBefore(errorElement, form);
        return;
    }


    let url = `http://localhost:8080/weather?address=${location}`

    fetch(url).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                errorElement.textContent = data.error;
                form.parentNode.insertBefore(errorElement, form);
                return;
            }

            let iconName = data.forecast.weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${iconName}@2x.png`
            let weather = document.createElement('div');
            weather.className = 'forecast'

            weather.innerHTML = `
                <img src=${iconUrl} />
                <p> Your requested location is <span class="requested-location">${data.address}</span>
                <p>We found it like <span class="requested-location">${data.location}</span>. And The weather for  this location is the following:<p>
                <p>Temperature is <span class="temperature">${data.forecast.temp}</span>. It could feels like the <span class="temperature">${data.forecast.feels_like}</span>. 
                You can expect ${data.forecast.weather[0].description}.</p>

            `
            form.parentNode.insertBefore(weather, form.nextSibling);
            console.log(data);

        });
    });

});







