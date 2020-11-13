import Wave from "wave-visualizer";
import AudioFile from "../audio.mp3";

export default class VoiceVisualizer {
  constructor() {
    this.audioStream = null;
  }

  async openAudioStream() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (err) {
      console.error("Cannot open audio media device: ", err);
    }
  }

  async startVisualization() {
    await this.openAudioStream();
    this.wave = new Wave();
    this.wave.fromStream(this.audioStream, "output", {
      type: "cubes",
      colors: ["blue", "#3498db"],
      stroke: 1,
    });
  }

  stopVisualization() {
    this.audioStream.getTracks().forEach(function (track) {
      track.stop();
    });
    //this.wave.stopStream();
  }
}
