// Add imports above this line
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Work with code below this line
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Event timeupdate
const timeupdate = function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
};

// Method setCurrentTime

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

player.on('timeupdate', throttle(timeupdate, 1000));
