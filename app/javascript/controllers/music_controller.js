import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "playButton", "intensityCanvas", "audio" ]

  audioPlay = () => {}
  ctx = undefined;
  width = 400;
  height = 100;
  sampleCount = 140;
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
    const sC = this.sampleCount;
    const width = canvas.width / sC;

    var data = this.aIntensity
    if (data == undefined) {
      data = this.generateNoise( this.sampleCount)
    }
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

  updateTimeBar() {
    // Get the value of what second the song is at
    let audioTime = this.audioTarget.currentTime;
    // time of song
    let audioLength = this.audioTarget.duration;
    // Assign a width to an element at time

    this.ctx.fillStyle = "red";

   // this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillRect(0,0, (this.intensityCanvasTarget.width * audioTime) / audioLength, this.intensityCanvasTarget.height)
  }

  playButtonPressed()
  {
    this.audioPlay = setInterval(() => this.updateTimeBar(), 1); // () => method() is NECESSARY

    this.dispatch("playButtonPressed", { detail: { content: [this.audioTarget, this.playButtonTarget, this.aIntensity, this.audioPlay ] } })
  }

  restartPressed() {
    console.log("restartPressed")
    this.dispatch("restartPressed", { detail: { content: [this.audioTarget, this.playButtonTarget, this.aIntensity, this.audioPlay ] } })
  }

  pause()
  {
    this.audioTarget.pause();
    clearInterval(this.audioPlay);
  }
}
