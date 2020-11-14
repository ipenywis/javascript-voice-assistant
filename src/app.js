import { getWeather } from "./api";
import { wait } from "./utils";
import VoiceAssistant from "./voiceAssistant";
import VoiceVisualizer from "./voiceVisualizer";

const startButton = document.getElementById("start-btn");

let isStarted = false;
let processingWord = null;

const voiceVisualizer = new VoiceVisualizer();
const voiceAssistant = new VoiceAssistant();

async function processWord(word) {
  switch (word) {
    case "Hello":
      voiceAssistant.saySpeech("Hello Islem, How are you doing today?");
      await wait(3000);
      break;
    case "Weather":
      const location = "London";
      const weather = await getWeather(location);
      voiceAssistant.saySpeech(
        `The weather for today in ${location} is ${weather} degrees`
      );
      await wait(3000);
      break;
    case "Good Morning":
      voiceAssistant.saySpeech(
        "Good Morning islem, Hope you slept well, for Today's schedule you have a meeting at 10am with you manager"
      );
      await wait(3000);
      break;
    case "Play a Song":
      voiceAssistant.saySpeech(
        "We are friends in a sleeping bag splitting the heat"
      );
      voiceAssistant.saySpeech(
        "We have one filthy pillow to share and your lips are in my hair"
      );
      voiceAssistant.saySpeech("Someone upstairs has a rat that we laughed at");
      await wait(3000);
      break;
  }

  processingWord = null;
}

function onListen(word) {
  if (processingWord) return;

  console.log("Word: ", word);
  processingWord = word;
  processWord(word);
}

startButton.onclick = async () => {
  if (!isStarted) {
    //Start assistant
    startButton.innerText = "Starting...";
    await voiceAssistant.startAssistant(onListen);
    await voiceVisualizer.startVisualization();
    isStarted = true;
    startButton.innerText = "Stop Assistant";
  } else {
    //Stop assistant
    startButton.innerText = "Stopping...";
    await voiceAssistant.stopAssistant();
    voiceVisualizer.stopVisualization();
    isStarted = false;
    startButton.innerText = "Start Assistant";
  }
};
