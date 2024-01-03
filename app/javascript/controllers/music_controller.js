import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "playButton", "intensityCanvas", "audio" ]

  static audioPlay = () => {}

  ctx = undefined;
  width = 420
  height = 80

  audioTargetConnected(element) {
    //console.log(element, "connected")
  }

  connect() {
    console.log("controller is: ", this.identifier);
    console.log("targets are", this.targets);
    this.setupCanvas();
  }

  setupCanvas() {
    if ( !this.hasIntensityCanvasTarget ) { console.log("music_controller.js::intensity canvas not found"); return;}

    this.intensityCanvasTarget.width = this.width
    this.intensityCanvasTarget.height = this.height;
    this.ctx = this.intensityCanvasTarget.getContext("2d")
    this.ctx.fillStyle = "rgb(200,100, 100)"
    this.ctx.fillRect(10,10,50, 50)
  }

  generateIntensityMap({ detail: { content } }){
    console.log("making intensity map from context ")
    // Set up audio context
    const audioContext = content;

    let audioBuffer = null;

    var url = this.audioTarget.src;
    const visualizeAudio = url => {
      fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => visualize(audioBuffer));
    };

  }

  updateTimeBar() {
    // Get the value of what second the song is at
    let audioTime = this.audioTarget.currentTime;
    // time of song
    let audioLength = this.audioTarget.duration;
    // Assign a width to an element at time
    this.ctx.fillRect(10,10,(audioTime * 100) / audioLength + '%', 50)
  }

  playButtonPressed()
  {
    this.audioPlay = setInterval(() => this.updateTimeBar(), 1); // () => method() is NECESSARY

    this.dispatch("playButtonPressed", { detail: { content: [this.audioTarget, this.playButtonTarget ] } })
  }

  pause()
  {
    this.audioTarget.pause();
    clearInterval(this.audioPlay);
  }
}
