export async function getWeather(city) {
  const weatherResponse = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=647c054a280143f79b500313201411&q=${city}`
  ).catch((err) => {
    console.error("Cannot fetch weather: ", err);
  });

  const jsonResponse = await weatherResponse.json();
  return jsonResponse.current.temp_c;
}
