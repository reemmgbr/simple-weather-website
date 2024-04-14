let locationn = document.querySelector("#location");
// console.log(locationn);
let dateDay = document.querySelector("#dateDay");
let dateMonth = document.querySelector("#dateMonth");
let temp = document.querySelector("#temp");
let imgwheather = document.querySelector("#imgwheather");
let weatherForm = document.querySelector(".weatherForm");
let text = document.querySelector("#text");
let search = document.querySelector("#searchss");
let humidity = document.querySelector("#humidity");
let windkph = document.querySelector("#windkph");
let windDir = document.querySelector("#windDir");
let imgNext = document.querySelector("#imgNext");
let maxtempNext = document.querySelector("#maxtempNext");

// search.addEventListener("keydown", () => {
//   console.log(search.value);
// });

async function getapi(cityName) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=2&key=1b38f92c1c714a948a1181843240504`
  );
  //     await fetch(`https://api.weatherapi.com/v1/current.json?q=${search.value}&key=1b38f92c1c714a948a1181843240504
  // `);

  let finalresonse = await response.json();
  return finalresonse;
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
    cartona += `<div class="col-md-6 backgroundrowtwo">
            <div class="text-center">
              <div class="">
                <div class="bg-frow">${
                  daysOfWeek[day + i + 2 > 7 ? day - 7 + i + 1 : day + i + 1]
                }</div>
              </div>
              <div class="p-4">
                <img src="${
                  forecast[i].day.condition.icon
                }" alt="" id="imgNext" />
              </div>

              <div class="text-white fw-bold" id="maxtempNext">${
                forecast[i].day.maxtemp_c
              }°c</div>
              <div class="text-light pt-2">${forecast[i].day.mintemp_c}°c</div>
              <div class="text-primary m-3 ">${
                forecast[i].day.condition.text
              }</div>
            </div>
          </div>`;

    // maxtempNext.innerHTML = forecast[i].day.maxtemp_c;
  }
  document.querySelector("#nextDays").innerHTML = cartona;
  search = document.querySelector("#searchss");

  search.addEventListener("keyup", function () {
    all(search.value);
  });
}
async function all(city = "mansoura") {
  let allfunctions = await getapi(city);
  displayCurrentDay(allfunctions);
  displaySecondData(allfunctions);
}
all();

// search.addEventListener("keyup", function (value) {
//   let term = value.target;
//   console.log(term);
// });
