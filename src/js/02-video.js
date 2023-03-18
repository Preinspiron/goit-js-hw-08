import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

document.addEventListener(
  'DOMContentLoaded',
  () => {
    player
      .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  },
  { once: true }
);

const saveLocalStorageTimeWithParam = ({ seconds }) =>
  saveLocalStorageTime(seconds);

const saveLocalStorageTimeWithParamThrottle = throttle(
  saveLocalStorageTimeWithParam,
  1000
);

player.on('timeupdate', saveLocalStorageTimeWithParamThrottle);

function saveLocalStorageTime(sec) {
  console.log(112);
  localStorage.setItem('videoplayer-current-time', sec);
}

/* const saveLocalStorageTimeWithParam = ({ seconds }) =>
  saveLocalStorageTime(seconds);

const saveLocalStorageTimeWithParamThrottle = throttle(
  saveLocalStorageTimeWithParam,
  1000
);

player.on('timeupdate', saveLocalStorageTimeWithParamThrottle);

function saveLocalStorageTime(sec) {
  console.log(111);
  localStorage.setItem('videoplayer-current-time', sec);
} */
