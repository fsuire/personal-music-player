#personal-music-player

/!\ This application is an experimentation. **It will not be finished or documented.**

personal-music-player is a small angular/nodejs/mongodb/gridfs-stream/socket.io music app.
It aims at putting audio files in mongodb, then read them using ffmpeg and mplayer, with the possibility of a remote control from another web terminal (like your smartphone).

##Requirements

* ffmpeg
* mplayer

##Setup

```shell
git clone git clone https://github.com/fsuire/personal-music-player.git
cd personal-music-player
npm install -g bower
npm i && bower i
gulp --env=dev
```

Then go to http://localhost:4000
