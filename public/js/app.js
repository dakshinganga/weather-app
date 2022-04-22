console.log("Client side javascript loaded");

const getData = (address) => {};

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = input.value;

	messageOne.textContent = "Loading Forecast";
	messageTwo.textContent = "";

	fetch(`/weather?address=${location}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
				return;
			}
			messageOne.textContent = data.address;
			messageTwo.textContent = `It is ${data.forecast} out their. The temperature is ${data.temperature} degree C. The humidity is ${data.humidity}%. `;
		});
});
