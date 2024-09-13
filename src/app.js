import * as Ui from "./ui";

function getDate() {
	let fullDate = new Date(),
		year = fullDate.getFullYear(),
		month = fullDate.getMonth() + 1,
		date = fullDate.getDate();
	return `${year}-${month}-${date}`;
}
async function fetchGif(conditions) {
	let response = await fetch(
		`https://api.giphy.com/v1/gifs/translate?api_key=kdyUEVailcdKwypBlT84XMIIeC3roYG0&s=weather ${conditions}`,
		{ mode: "cors" }
	);
	response = await response.json();
	return response.data.images.original.url;
}
async function fetchWeatherData(location) {
	try {
		let date = getDate();
		let response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=2UMDXDLWA46LKC37JFXEQCU2A&include=days&elements=temp,precipprob,conditions,description`
        );
        if (!response.ok) {
            throw new Error ()
        }
		let data = await response.json();
		console.log(data);
		let gif = await fetchGif(data.days[0].conditions);
		return {
			gif,
			temperature: data.days[0].temp,
			precipprob: data.days[0].precipprob,
			conditions: data.days[0].conditions,
			description: data.days[0].description,
		};
    } catch (error) {
        throw error
	}
}

export { fetchWeatherData };
