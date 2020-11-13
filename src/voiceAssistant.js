import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

const MODEL_URL = "../AI_MODELS/voice_model/";

//Import Model's Data using webpack file-loader
import VoiceModel from "../AI_MODELS/voice_model/model.json";
import VoiceModelMetadata from "../AI_MODELS/voice_model/metadata.json";

//const VoiceModel = require("../AI_MODELS/voice_model/model.json")

export default class VoiceAssistant {
  constructor() {
    this.options = {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: false,
      overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
    };
  }

  async buildModel() {
    const recognizer = speechCommands.create(
      "BROWSER_FFT",
      undefined,
      VoiceModel,
      VoiceModelMetadata
    );

    //Make sure model's data has been loaded over HTTPS
    await recognizer.ensureModelLoaded();

    return recognizer;
  }

  async initialize(onListen) {
    this.recognizer = await this.buildModel();
    const predictionContainer = document.getElementById("prediction");

    const classLabels = this.recognizer.wordLabels();

    await this.recognizer.listen((result) => {
      const scores = result.scores;

      const wordScore = scores.reduce((previousValue, value) => {
        if (previousValue) {
          if (previousValue > value) return previousValue;
        }
        return value;
      });

      const wordIdx = scores.findIndex((v) => v === wordScore);
      const word = classLabels[wordIdx];

      if (onListen) onListen(classLabels, word);
    }, this.options);
  }

  async stop() {
    await this.recognizer.stopListening();
  }
}
