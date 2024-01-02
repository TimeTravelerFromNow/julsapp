import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "play", "pause", "audioTrack", "audio", "time" ]

  static audioPlay = () => {}

  audioTargetConnected(element) {
    //console.log(element, "connected")
  }

  connect() {
    console.log("controller is: ", this.identifier);
    console.log("targets are", this.targets);
    //let audio = document.getElementById("audio"); // Take the audio element
    //let time = document.querySelector(".time"); // Take the audio track
    //let btnPlay = document.querySelector(".play"); // Take the play button
    //let btnPause = document.querySelector(".pause"); // Take the pause button
    console.log("got here");
    //  this.playTarget.innerHTML = "Play Connected";
     // if (gon.music_data) { console.log(gon.music_data) } ;
    //this.element.addEventListener('mousemove', (event) => {});
  }

  updateTimeBar() {
    // Get the value of what second the song is at
    let audioTime = this.audioTarget.currentTime;
    // time of song
    let audioLength = this.audioTarget.duration;
    // Assign a width to an element at time
    this.timeTarget.style.width = (audioTime * 100) / audioLength + '%';
  }

  play()
  {
    if (this.hasAudioTarget)
    {
      //console.log("trying to play", gon.music_data_blob_file);

      if( this.audioTarget.currentTime >= this.audioTarget.duration - 1)
      {
        this.audioTarget.currentTime = 0; // rewind if at end
      }

      this.audioTarget.play();
    }
    else {
      console.log("audio target not found in music_controller.js");
      return;
    }
    this.audioPlay = setInterval(() => this.updateTimeBar(), 1); // () => method() is NECESSARY
  }

  pause()
  {
    this.audioTarget.pause();
    clearInterval(this.audioPlay);
  }
}
