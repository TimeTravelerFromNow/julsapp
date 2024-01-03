import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static audioPlay = () => {}

  static aCtx = undefined;
  static audioT = undefined;
  static playBT = undefined;

  audioTargetConnected(element) {
    //console.log(element, "connected")
  }

  connect() {
    this.aCtx = window.audioCtx || window.webkitAudioContext;
    this.aCtx = new AudioContext();
  }

  sendCtx() {
    console.log("sending audio ctx to music controller")
    this.dispatch("sendCtx", { detail: { content: this.aCtx } })
  }

  disconnect() {
    this.aCtx.close()
  }

  updateTimeBar() {
  }

  pauseAll()
  {

  }
  playPressed({ detail: { content } }){
    var pausedBefore = false
    if( this.audioT != undefined) {
      pausedBefore = ( this.audioT.paused )

      // pause audio
      this.audioT.pause()

      this.playBT.classList.remove("fa-pause")
      this.playBT.classList.add("fa-play")
    }

    // is this the same song?
    var samePiece = (this.audioT == content[0])

    // new audio
    this.audioT = content[0]
    this.playBT = content[1]

    if (!( !pausedBefore && samePiece )) {
      this.audioT.play()
      this.playBT.classList.remove("fa-play")
      this.playBT.classList.add("fa-pause")
    }

    if( this.audioT.currentTime >= content.duration - 1)
    {
      this.audioT.currentTime = 0; // rewind if at end
    }
    console.log("audio_controller.js pressed and connected actions")
    console.log(content)
  }
}
