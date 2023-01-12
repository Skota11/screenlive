let url = new URL(window.location.href);
let params = url.searchParams;
const roomId = params.get("id");

const remoteVideo = document.getElementById("remote-stream");

const room = peer.joinRoom(roomId, {
  mode: getRoomModeByHash(),
});
room.on("stream", async (stream) => {
  const newVideo = document.createElement("video");
  newVideo.srcObject = stream;
  newVideo.playsInline = true;
  newVideo.setAttribute("data-peer-id", stream.peerId);
  newVideo.setAttribute("controls", "");
  newVideo.setAttribute("class", "video-js");
  newVideo.setAttribute("id", "videoPlayer");
  remoteVideo.append(newVideo);

  videojs("videoPlayer", {
    width: 640, // 幅
    height: 360, // 高さ
    autoplay: true, // 自動再生
    loop: false, // ループ再生
    controls: true, // コントロール制御表示
    preload: "auto", // 読み込み制御
    liveui: true,
  }).play();
});
