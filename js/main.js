let locationn = document.querySelector("#location");
let dateDay = document.querySelector("#dateDay");
let dateMonth = document.querySelector("#dateMonth");
let temp = document.querySelector("#temp");
let imgwheather = document.querySelector("#imgwheather");
let text = document.querySelector("#text");
let search = document.querySelector("#searchss");
let humidity = document.querySelector("#humidity");
let windkph = document.querySelector("#windkph");
let windDir = document.querySelector("#windDir");

async function getapi(cityName) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=2&key=1b38f92c1c714a948a1181843240504`
    );
    let finalresonse = await response.json();
    return finalresonse;
  } catch (error) {
    console.error("Error fetching the API:", error);
  }
}

function displayCurrentDay(data) {
  let todayDate = new Date();
  dateDay.innerHTML = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  dateMonth.innerHTML = todayDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
  });
  locationn.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c + "°c";
  imgwheather.setAttribute("src", data.current.condition.icon);
  imgwheather.setAttribute("alt", data.current.condition.text); // إضافة نص بديل
  text.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  windkph.innerHTML = data.current.wind_kph + "km/h";
  windDir.innerHTML = data.current.wind_dir;
  console.log(search);
}

function displaySecondData(data) {
  const day = new Date().getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(day);
  let forecast = data.forecast.forecastday;
  let cartona = "";
  for (let i = 0; i < forecast.length; i++) {
    console.log(forecast[i].day.condition.icon); // تحقق من المسار هنا
    cartona += `<div class="col-md-6 backgroundrowtwo">
            <div class="text-center">
              <div class="">
                <div class="bg-frow">${daysOfWeek[(day + i + 1) % 7]}</div>
              </div>
              <div class="p-4">
                <img src="${forecast[i].day.condition.icon}" alt="${
      forecast[i].day.condition.text
    }" id="imgNext${i}" />
              </div>

              <div class="text-white fw-bold" id="maxtempNext${i}">${
      forecast[i].day.maxtemp_c
    }°c</div>
              <div class="text-light pt-2">${forecast[i].day.mintemp_c}°c</div>
              <div class="text-primary m-3 ">${
                forecast[i].day.condition.text
              }</div>
            </div>
          </div>`;
  }
  document.querySelector("#nextDays").innerHTML = cartona;
}

search.addEventListener("keyup", function () {
  all(search.value);
});

async function all(city = "mansoura") {
  let allfunctions = await getapi(city);
  if (allfunctions) {
    displayCurrentDay(allfunctions);
    displaySecondData(allfunctions);
  } else {
    console.error("Failed to fetch weather data.");
  }
}

all();
