const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const list = document.querySelector(".response-section .cities");
const msg = document.querySelector(".msg");

const apiKey = "50a8b0ec5276e4eb3f4ea3540706b3fc";

form.addEventListener("submit", e => {
  e.preventDefault();

  let inputVal = input.value.toLowerCase();


    const listItems = list.querySelectorAll(".response-section .city");
    const listItemsArray = Array.from(listItems);

    if(listItemsArray.length > 0) {
        const dublicate = listItemsArray.find(el => {
            const cityName = el.querySelector(".city-name span").textContent.toLowerCase();
            console.log(cityName);
            return inputVal === cityName;
        });

    }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add('city');
      const markup = `
                <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}
                <sup>°C</sup></div>
                <figure>
                    <img class="city-icon" src="${icon}" alt="${
                        weather[0]["description"]
                    }">
                    <figcaption>${weather[0]["description"]}</figcaption>
                </figure>
            `;

      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Please search for a valid city"
    });

form.reset();
input.focus();
msg.textContent = "";
});
// ``;
