

const apiKey = "cb834df0e74c81de60264f562daff05c"; // Weatherstack API key
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const menuBtn = document.querySelector(".menu-btn");
const suggestionsBox = document.querySelector(".suggestions");

const cityList = [
// Andhra Pradesh Cities
"Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Kakinada", 
"Tirupati", "Anantapur", "Kadapa", "Eluru", "Ongole", "Vizianagaram", "Machilipatnam", 
"Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram", "Madanapalle", 
"Guntakal", "Srikakulam", "Dharmavaram", "Gudivada", "Narasaraopet", "Tadipatri", 
"Tadepalligudem", "Chilakaluripet",

// Telangana Cities
"Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", 
"Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet", 
"Jagtial", "Mancherial",

// Previously Listed Major Cities in India
"Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Pune", "Ahmedabad", "Jaipur", 
"Lucknow", "Kanpur", "Varanasi", "Agra", "Udaipur", "Chandigarh", "Amritsar", "Jammu", 
"Nagpur", "Nashik", "Surat", "Vadodara", "Jodhpur", "Mysore", "Coimbatore", "Madurai", 
"Thiruvananthapuram", "Kochi", "Mangalore", "Howrah", "Bhubaneswar", "Cuttack", "Ranchi", 
"Patna", "Guwahati", "Bhopal", "Indore"
];

// Toggle Suggestions Menu
menuBtn.addEventListener("click", () => {
    suggestionsBox.innerHTML = cityList.map(city => `<p>${city}</p>`).join('');
    suggestionsBox.style.display = suggestionsBox.style.display === "block" ? "none" : "block";
});

// Select City from Suggestions
suggestionsBox.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
        search.value = e.target.textContent;
        suggestionsBox.style.display = "none";
    }
});

const url = (city) => `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

// Fetch Weather Data
async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city));
        const respData = await resp.json();

        if (!respData.location) {
            main.innerHTML = `<p style="color: red;">City not found!</p>`;
            return;
        }

        addWeatherToPage(respData);
    } catch (error) {
        main.innerHTML = `<p style="color: red;">Failed to fetch weather data.</p>`;
    }
}

// Display Weather Data
function addWeatherToPage(data) {
    if (!data.current || !data.location) {
        main.innerHTML = `<p style="color: red;">Invalid weather data.</p>`;
        return;
    }

    const temp = data.current.temperature;
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2>
            <img src="${data.current.weather_icons[0]}" />
            ${temp}°C
            <img src="${data.current.weather_icons[0]}" />
        </h2>
        <small>${data.current.weather_descriptions[0]}</small>
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

// Handle Form Submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value.trim();

    if (city) {
        getWeatherByLocation(city);
    }
});

// Hide Suggestions When Clicking Outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
        suggestionsBox.style.display = "none";
    }
});
