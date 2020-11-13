import VoiceAssistant from "./voiceAssistant";
import VoiceVisualizer from "./voiceVisualizer";

const startButton = document.getElementById("start-btn");
const wordPreviewContainer = document.getElementById("word-preview");

let listeningStarted = false;
let processingWord = null;
const voiceVisualizer = new VoiceVisualizer();
const voiceAssistant = new VoiceAssistant();

const wait = (s) => new Promise((rs) => setTimeout(rs, s));

function saySpeech(text) {
  const wordUtrance = new window.SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(wordUtrance);
}

function writeWord(word) {
  wordPreviewContainer.innerText = word;
}

async function processWord(word) {
  writeWord(word);
  switch (word) {
    case "Hello":
      saySpeech("Hello Islem, How are you doing?");
      await wait(3000);
      break;
  }

  processingWord = null;
}

function onListen(labels, word) {
  if (processingWord) return;

  processingWord = word;
  console.log("Word: ", word);
  processWord(word);
}

startButton.onclick = async () => {
  //Start/Stop audio visualization
  if (!listeningStarted) {
    startButton.innerText = "Starting...";
    await voiceAssistant.initialize(onListen);
    await voiceVisualizer.startVisualization();
    listeningStarted = true;
    startButton.innerText = "Stop Listening";
  } else {
    startButton.innerText = "Stopping...";
    listeningStarted = false;
    voiceVisualizer.stopVisualization();
    await voiceAssistant.stop();
    startButton.innerText = "Start Listening";
  }
};

// const voiceAssistant = new VoiceAssistant();
// voiceAssistant.initialize();
