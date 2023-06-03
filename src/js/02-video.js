import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onTimeUpdate(data) {
  localStorage.setItem("videoplayer-current-time", data.seconds);
  }

player.on('timeupdate', throttle(onTimeUpdate, 1000));
const currentVideoTime = localStorage.getItem("videoplayer-current-time")
player.setCurrentTime(currentVideoTime || 0);    