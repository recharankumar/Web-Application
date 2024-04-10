const apiKey: string = "255d1cde09e8b2c78cb776312619ca2c";
const apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox: HTMLInputElement = document.querySelector(".search input") as HTMLInputElement;
const searchBtn: HTMLButtonElement = document.querySelector(".search button") as HTMLButtonElement;
const weatherIcon: HTMLImageElement = document.querySelector(".Weather-icon") as HTMLImageElement;

async function checkWeather(city: string): Promise<void> {
    const response: Response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.status == 404) {
        (document.querySelector(".error") as HTMLElement).style.display = "block";
        (document.querySelector(".Weather") as HTMLElement).style.display = "none";
    } else {
        (document.querySelector(".error") as HTMLElement).style.display = "none";
        const data: any = await response.json();

        console.log(data);
        (document.querySelector(".city") as HTMLElement).innerHTML = data.name;
        (document.querySelector(".temp") as HTMLElement).innerHTML = Math.round(data.main.temp) + " °C";
        (document.querySelector(".humidity") as HTMLElement).innerHTML = data.main.humidity + "%";
        (document.querySelector(".wind") as HTMLElement).innerHTML = data.wind.speed + " km/h";
        (document.querySelector(".sunrise") as HTMLElement).innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        (document.querySelector(".sunset") as HTMLElement).innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        (document.querySelector(".latitude") as HTMLElement).innerHTML = data.coord.lat;
        (document.querySelector(".longitude") as HTMLElement).innerHTML = data.coord.lon;
        (document.querySelector(".country") as HTMLElement).innerHTML = data.sys.country;
        const iconCode: string = data.weather[0].icon;
        const iconUrl: string = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;

        (document.querySelector(".Weather") as HTMLElement).style.display = "block";
        searchBox.value = "";
    }
}

function handleSearch(): void {
    checkWeather(searchBox.value);
}

// Add event listener for click on search button
searchBtn.addEventListener("click", handleSearch);

// Add event listener for Enter key press on input field
searchBox.addEventListener("keydown", function(event: KeyboardEvent): void {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        handleSearch(); // Call the search function
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
