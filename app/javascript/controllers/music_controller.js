import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "playButton", "intensityCanvas", "audio" ]

  static audioPlay = () => {}

  ctx = undefined;
  width = 400;
  height = 100;
  aIntensity = undefined;

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
 const dpr = window.devicePixelRatio || 1;
    this.ctx = this.intensityCanvasTarget.getContext("2d")
    this.ctx.scale(dpr, dpr);

    const canvas = this.intensityCanvasTarget;
    canvas.width = this.width
    canvas.height = this.height
    // draw the line segments
  const padding = 20;
  const sC = 100;
  const width = canvas.width / sC;

  const data = this.generateNoise( sC)
  const midPoint = canvas.offsetHeight / 2;
  for (let i = 1; i < sC; i++) {
    const x = width * i;
    const height = Math.abs(data[i] * canvas.height )  ;
    this.drawLineSegment(this.ctx, x, height, midPoint, width, (i + 1) % 2);
  }
  }

  generateNoise(c) {
    let arr = Array(c).fill(0)
    for(let i = 0; i < c; i++ ) {
      arr[i] = Math.random() - 0.5;
    }
    return arr
  }

  drawLineSegment(ctx, x, y, mP, width, isEven) {
    ctx.beginPath();

    ctx.lineWidth = 1; // how thick the line is
    ctx.strokeStyle = "#f81"; // what color our line is
    y = isEven ? y : -y;
    ctx.moveTo(x, mP);
    ctx.lineTo(x, mP + y);
    ctx.arc(x + width / 2, mP + y, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, mP);
    ctx.stroke();

  };

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
