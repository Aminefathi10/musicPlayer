const songs = [
                  "./POP SMOKE - ARMED AND DANGEROUS.mp3",
                  "./POP SMOKE - AP.mp3",
                  "./POP SMOKE - INVINCIBLE.mp3",
                  "./POP SMOKE - GET BACK.mp3",
                  "./Pop Smoke - Hawk Em.mp3",
                  "./Pop Smoke - Dior.mp3",
                  "./Pop Smoke - Element.mp3",
                  "./POP SMOKE - Welcome To The Party.mp3",
                ];
    const audio = new Audio();
    
    var i = 0;
    var isPlaying = false;
    
    function play() {
      audio.src = songs[i];
      audio.play();
      setTimeout(() => {
      document.getElementById("songDis").innerHTML = songs[i].slice(songs[i].indexOf("/") + 1, songs[i].lastIndexOf(".")) +
   " - " + Math.floor(audio.duration/60).toString().padStart(2, "0") + ":" + (Math.round(audio.duration) % 60).toString().padStart(2, "0");
        
        document.title = songs[i].slice(songs[i].indexOf("/") + 1, songs[i].lastIndexOf("."));
      }, 1000)
      
      setInterval(() => document.getElementById("songtime").innerHTML = Math.floor(audio.currentTime/60).toString().padStart(2, "0") 
      + ":" + (Math.floor(audio.currentTime) % 60).toString().padStart(2, "0"), 1000);
      
      document.querySelectorAll("#songList div").forEach((el, index) => {
        if(index === i) {
          el.classList.add("playing")
        } else {
          el.classList.remove("playing")
        }
      })
    }
    
    audio.onplay = () => isPlaying = true;
    function pauseplay(){
      if (isPlaying) { 
        audio.pause();
        isPlaying = false;
      } else {
        audio.play()
      }
      
    }
    
    function next() {
      i = i < songs.length-1 ? i+1 : 0;
      play()
    }
    
    audio.onended = () => next();
  
    function previous() {
      if (audio.currentTime >= 1) {
        audio.currentTime = 0;
        return;
      }
      i = i > 0 ? i-1 : songs.length -1;
      play()
    }
    
    function loop(e) {
     audio.loop = e.target.checked;
     document.querySelector('label > div > *').style.display = e.target.checked ? 'block' : 'none';
    }
    
    function skipTime(e) {
      audio.currentTime = (e.target.value * audio.duration) / 100
    }
    
    const timeInput = document.getElementById("timetrack");
    setInterval(() => {
      timeInput.value = (audio.currentTime * 100) / audio.duration
    }, 1000);
    
    function playDisSong(index) {
      i = index;
      play();
    }
    document.getElementById("songList").innerHTML = 
    songs.map(( el, index ) => `<div class="song" onclick="playDisSong(${index})">
      <h3>${el.slice(el.indexOf("/")+1, el.lastIndexOf("."))}</h3>
    </div>`).join("");
    

