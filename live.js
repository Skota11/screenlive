const Peer = window.Peer;
let room;
let localStream;
//DOM-value
const localVideo = document.getElementById("local_stream");
//peerSet
const peer = (window.peer = new Peer({
  key: "ff4aac66-dfa3-41b1-8e9b-80fff81cd0c4",
  debug: 3,
}));
async function startStream() {
  localStream = await navigator.mediaDevices
    .getDisplayMedia({
      audio: true,
      video: true,
    })
    .catch();
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);
  room = peer.joinRoom(peer.id, {
    mode: "mesh",
    stream: localStream,
  });
  document.getElementById("start_stream_btn").style.display = "none";
  document.getElementById("change_stream_btn").style.display = "inline";
  document.getElementById("stop_stream_btn").style.display = "inline";
  document.getElementById("stream_status").textContent = "配信中";
  document.getElementById(
    "shareLink"
  ).value = `https://screenlive.pages.dev/watch?id=${peer.id}`;
  document.getElementById("roomId").value = peer.id;
}
async function changeStream() {
  localStream = await navigator.mediaDevices
    .getDisplayMedia({
      audio: true,
      video: true,
    })
    .catch();
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);
  room.replaceStream(localStream);
}
function stopStream() {
  room.close(), { once: true };
  document.getElementById("stream_status").textContent = "配信を停止";
}
//event
