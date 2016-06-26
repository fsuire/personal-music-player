#personal-music-player

/!\ This application is an experimentation. **It will never be finished or documented.**

personal-music-player is a small angular/nodejs/mongodb/gridfs-stream/socket.io music app.
The goal is to put mp3 in mongodb, then read it with your desktop computer (using ffmpeg and mplayer) with the possibility to control it from another web terminal (like your smartphone).

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

Then go to http://localhost:4000 (and don't forget to upload music before searching)
