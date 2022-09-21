//歌曲信息
var lyric = [
  {
    name: "The Year of Rush",
    img: "./img/cover.webp",
    audio_src: "music/music.mp3",
    content:
      "00:01.92]The Year of Rush - Faye Wong \n[00:28.21]匆匆那年 我们究竟说了几遍\n[00:31.17]再见之后 再拖延\n[00:33.89]可惜谁有没有 爱过不是一场\n[00:36.85]七情上面的雄辩\n[00:39.57]匆匆那年我们 一时匆忙撂下\n[00:42.42]难以承受的诺言\n[00:45.15]只有等别人兑现\n[00:51.00]不怪那吻痕 还没积累成茧\n[00:56.41]拥抱着冬眠 也没能羽化再成仙\n[01:02.01]不怪这一段情没空反复再排练\n[01:07.56]是岁月宽容恩赐 反悔的时间\n[01:18.57]如果再见不能红着眼 是否还能红着脸\n[01:24.49]就像那年匆促刻下\n[01:26.54]永远一起那样美丽的谣言\n[01:29.73]如果过去还值得眷恋 别太快冰释前嫌\n[01:35.78]谁甘心就这样 彼此无挂也无牵\n[01:41.49]我们要互相亏欠 要不然凭何怀缅\n[01:58.26]匆匆那年 我们见过太少世面\n[02:01.22]只爱看同一张脸\n[02:03.93]那么莫名其妙 那么讨人欢喜\n[02:06.78]闹起来又太讨厌\n[02:09.41]相爱那年活该匆匆\n[02:11.47]因为我们不懂顽固的诺言\n[02:15.10]只是分手的前言\n[02:20.96]不怪那天太冷 泪滴水成冰\n[02:26.42]春风也一样没吹进凝固的照片\n[02:31.99]不怪每一个人没能完整爱一遍\n[02:37.69]是岁月善意落下 残缺的悬念\n[02:48.41]如果再见不能红着眼 是否还能红着脸\n[02:54.56]就像那年匆促刻下\n[02:56.51]永远一起那样美丽的谣言\n[02:59.43]如果过去还值得眷恋 别太快冰释前嫌\n[03:05.76]谁甘心就这样 彼此无挂也无牵\n[03:10.66]如果再见不能红着眼 是否还能红着脸\n[03:17.00]就像那年匆促刻下\n[03:19.00]永远一起那样美丽的谣言\n[03:21.87]如果过去还值得眷恋 别太快冰释前嫌\n[03:28.25]谁甘心就这样 彼此无挂也无牵\n[03:33.96]我们要互相亏欠 我们要藕断丝连",
  },
];
window.onload = function () {
  var play_btn = document.getElementById("play_btn"); //play button
  var prev_btn = document.getElementById("prev_btn"); //previous song button
  var next_btn = document.getElementById("next_btn"); //next_btn
  var audio = document.getElementsByTagName("audio")[0]; //audio tag
  var initTime = document.getElementsByTagName("time")[0]; //start time tag
  var time = document.getElementsByTagName("time")[1]; //end time tag
  var progress_bar = document.getElementById("progress_bar"); //progress_bar_length
  var progress_cube = document.getElementById("progress_cube"); //current progress bar
  var vol_bar = document.getElementById("vol_bar"); //sound progress bar
  var vol_cube = document.getElementById("vol_cube"); //sound slider
  var lyric_con = document.getElementById("lyric_con"); // lyrics
  var lyric_txt = document.getElementById("lyric_txt"); //lyric_text
  var photo_pic = document.getElementById("photo_pic"); //cover image
  var icon1 = document.getElementById("icon1"); //like button
  var icon2 = document.getElementById("icon2"); //favorite button
  var lyric_tit = document.getElementById("lyric_tit"); //Song title
  var list_con = document.getElementById("list_con"); //song list
  var list_item = list_con.getElementsByTagName("p"); //all songs
  var songIndex = 0; //current song subscript
  var container = document.getElementById("container"); //the largest box
  var obj;
  function config() {
    this.play_mark = true; //play_flag mark
    this.duration = audio.duration; //song duration
    this.play_btn = "&#xe60e;"; //play button
    this.vol = audio.volume; //Sound decibel, volume control
    this.timer = null; //timer
    this.rotateSum = 0; //cover rotation angle
    this.icon1 = icon1.innerHTML; //like icon
    this.icon2 = icon2.innerHTML; //favorite icon
    this.icon1_co = icon1.style.color; //the color of the favorite icon
    this.endplay_btn = "&#xe60c;"; //pause button
    this.endicon1 = icon1.innerHTML; //like icon change
    this.endicon2 = "&#xe674;"; //favorite icon color change
  }

  obj = new config(); //instantiate
  //List control
  //all song names rendered
  var allSong = "";
  for (var song = 0; song < lyric.length; song++) {
    //render all songs in a loop
    allSong += "<p>" + lyric[song].name + "</p>";
  }
  list_con.innerHTML = allSong;
  list_con.style.height = lyric.length * 30 + "px";
  for (var listIndex = 0; listIndex < list_item.length; listIndex++) {
    list_item[listIndex].index = listIndex;
    list_item[listIndex].onclick = function (ev) {
      var ev = ev || window.event;
      ev.stopPropagation();
      songIndex = this.index;
      change_music();
    };
  }
  //Song list display
  list_con.style.display = "none";
  list.onclick = function () {
    if (list_con.style.display == "none") {
      // display
      list_con.style.display = "block";
    } else {
      //hide
      list_con.style.display = "none";
    }
  };
  //next song
  next_btn.onclick = function () {
    songIndex++; //index subscript++
    change_music(); //change_song_according_to_index
  };
  //previous song
  prev_btn.onclick = function () {
    if (songIndex == 0) {
      // Special handling as there is only one song at the moment
      return;
    } else {
      //previous song
      songIndex--;
      change_music();
    }
  };
  //Change the song
  function change_music() {
    clearInterval(obj.timer); //clear the timer
    if (songIndex >= lyric.length) {
      // current song subscript exceeds the list of all songs
      songIndex = 0; //set to 0
    } else if (songIndex < 0) {
      //if not exceeded
      songIndex = lyric.length;
    }
    obj = new config();
    iconinit(); //icon initialization
    audioInit(); //audio initialization
    playedTime(); //Song to be set when playing

    lyric_ctrl(); //Lyrics handling
  }
  //initialize total time, volume, etc.
  function audioInit() {
    time.innerHTML = format(audio.duration); //format the audio duration
    audio.volume = 0.5; //set audio sound
    play_btn.innerHTML = obj.play_btn; //set initialize play button
    vol_cube.style.left = audio.volume * vol_bar.offsetWidth + "px"; //Set the sound slider position

    lyric_tit.innerText = lyric[songIndex].name; //set the title of the lyrics
    photo_pic.style.background = "url(" + lyric[songIndex].img + ")"; //set the cover image
    audio.src = lyric[songIndex].audio_src; //set song src
    progress_cube.style.left = 0; //initialize the song progress bar
  }
  audioInit(); //initialize
  //play time
  audio.addEventListener("timeupdate", function () {
    //audio playback listener
    playedTime();
  });
  function playedTime() {
    if (audio.currentTime == audio.duration) {
      //The current song is finished, next song
      next_btn.onclick();
      play_btn.onclick();
    }
    var n = audio.currentTime / audio.duration; // current time share
    progress_cube.style.left = n * progress_bar.offsetWidth + "px"; //set the progress bar position
    initTime.innerHTML = format(audio.currentTime); //format the current time
    var id_num = parseInt(audio.currentTime); //format the current time
    var lyric_p = document.getElementsByTagName("p"); //get the lyrics tag
    for (var i = 0; i < lyric_p.length; i++) {
      //Set lyrics content
      lyric_p[i].index = i;
    }
    if (document.getElementById("lyric" + id_num)) {
      //Lyrics id
      var obj = document.getElementById("lyric" + id_num);
      for (var i = 0; i < obj.index; i++) {
        //Lyrics style settings
        lyric_p[i].className = "played";
      }
      for (var j = obj.index; j < lyric_p.length; j++) {
        //Lyrics style setting cancellation
        lyric_p[j].className = "";
      }
      obj.className = "aquamarine active";
      lyric_txt.style.top = lyric_con.offsetHeight / 2 - obj.offsetTop + "px";
    }
  }
  //Package Time Formatting
  function format(time) {
    var time = parseInt(time);
    var m = parseInt(time / 60);
    var s = parseInt(time % 60);
    m = zero(m);
    s = zero(s);
    function zero(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    }
    return m + ":" + s;
  }
  //Can drag and drop the progress bar to adjust the progress
  progress_cube.onmousedown = function (ev) {
    var ev = ev || window.event;
    var initX = ev.clientX - this.offsetLeft; //Get slider position by window event and browser window event
    this.onmousemove = function (ev) {
      //Mouse over audio progress bar movement event
      var ev = ev || window.event;
      var x = ev.clientX - initX;
      if (x < 0) {
        x = 0;
      }
      if (x > progress_bar.offsetWidth - 14) {
        x = progress_bar.offsetWidth - 14;
      }
      play_ctrl(x);
    };
    document.onmouseup = function () {
      //Mouse over audio progress bar lift event
      document.onmousemove = null;
      progress_cube.onmousemove = null;
    };
  };
  //Make lyrics slideable
  function play_ctrl(x) {
    var timego = (x / progress_bar.offsetWidth) * audio.duration;
    progress_cube.style.left = x + "px";
    audio.currentTime = timego;
    playedTime();
  }
  //Click on the progress bar position
  progress_bar.onclick = function (ev) {
    var ev = ev || window.event;
    var dis = ev.clientX - (container.offsetLeft + progress_bar.offsetLeft) - 7; //Get slider position
    progress_cube.style.left = dis + "px";
    play_ctrl(dis);
  };
  //Dragging the volume keys
  vol_cube.onmousedown = function (ev) {
    var ev = ev || window.event;
    var initX = ev.clientX - vol_cube.offsetLeft;
    this.onmousemove = function (ev) {
      //Mouse over volume slider to set position, same as audio progress bar
      var ev = ev || window.event;
      var x = ev.clientX - initX;
      if (x < 0) {
        x = 0;
      }
      if (x > vol_bar.offsetWidth - 11) {
        x = vol_bar.offsetWidth - 11;
      }
      var volresult = x / vol_bar.offsetWidth;
      this.style.left = x + "px";
      audio.volume = volresult;
    };
    document.onmouseup = function () {
      //Mouse up event
      document.onmousemove = null;
      vol_cube.onmousemove = null;
    };
  };
  //Click to play
  play_btn.onclick = function () {
    clearInterval(obj.timer);
    if (obj.play_mark) {
      //Play
      this.innerHTML = obj.endplay_btn;
      audio.play();
      obj.timer = setInterval(function () {
        //Timer rotates the cover to make the cover rotate
        obj.rotateSum = obj.rotateSum + 1;
        photo_pic.style.transform = "rotate(" + obj.rotateSum + "deg)";
      }, 30);
    } else {
      //Pause
      this.innerHTML = obj.play_btn;
      audio.pause();
    }
    obj.play_mark = !obj.play_mark;
  };
  //Lyrics processing, by splitting the duration string into arrays, to achieve lyrics
  function lyric_ctrl() {
    var lyricObj = lyric[songIndex].content;
    var temp = lyricObj.split("[");
    var html = "";
    for (var i = 0; i < temp.length; i++) {
      var arr = temp[i].split("]");
      var text = arr[1];
      var time = arr[0].split(",");
      var temp2 = time[0].split(".");
      var ms = temp2[1]; //Milliseconds
      var temp3 = temp2[0].split(":");
      var s = temp3[1]; //Seconds
      var m = temp3[0]; //Minutes
      var s_sum = parseInt(m * 60) + parseInt(s);
      if (text) {
        //Lyrics to fill in
        html += "<p id='lyric" + s_sum + "'>" + text + "</p>";
      }
    }
    lyric_txt.innerHTML = html;
  }
  lyric_ctrl();
  //Like Bookmark Icon Initialization
  function iconinit() {
    icon1.className = "icon";
    icon1.innerHTML = obj.icon1;
    icon1.style.color = "#fff";
    icon2.className = "icon";
    icon2.style.color = "#fff";
  }
  //Like Favorite Icon highlighting or not
  icon2.onclick = function () {
    if (this.innerHTML == obj.icon2) {
      this.innerHTML = obj.endicon2;
      this.style.color = "aquamarine";
      this.className = "icon yellow";
    } else {
      this.innerHTML = obj.icon2;
      this.style.color = "#fff";
      this.className = "icon";
    }
  };
  icon1.onclick = function () {
    if (this.style.color == obj.icon1_co) {
      this.innerHTML = obj.endicon1;
      this.style.color = "#f7759f";
      this.className = "icon pink";
    } else {
      this.innerHTML = obj.icon1;
      this.style.color = obj.icon1_co;
      this.className = "icon";
    }
  };
};
