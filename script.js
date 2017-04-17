// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
	playerVars: {'start': convert('13:35'),
		     'end': convert('14:08')},
        videoId: 'YsbrRAgv1b4',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function convert(sec) {
    var dlm = sec.indexOf(':');
    if (dlm == -1)
	return parseInt(sec);
    var min = parseInt(sec.slice(0, dlm));
    var sec = parseInt(sec.slice(dlm + 1));
    console.log(sec);
    return min * 60 + sec;
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
function onPlayerStateChange(event) {
    //    if (event.data == YT.PlayerState.PLAYING && !done) {
    if (event.data == YT.PlayerState.ENDED) {
	player.seekTo(convert('4:28'));
	player.playVideo();
        setTimeout(pauseVideo, 40 * 1000);
//        done = true;
    }
}

function pauseVideo() {
    player.pauseVideo();
}
