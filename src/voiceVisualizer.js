import Wave from "wave-visualizer";

export default class VoiceVisualizer {
  constructor() {}

  async openAudioStream() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (err) {
      console.error("Cannot open Audio Stream ", err);
    }
  }

  async startVisualization() {
    await this.openAudioStream();

    let wave = new Wave();

    wave.fromStream(this.audioStream, "output", {
      type: "bars",
      colors: ["blue", "3498db"],
      stroke: 1,
    });
  }

  stopVisualization() {
    this.audioStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
