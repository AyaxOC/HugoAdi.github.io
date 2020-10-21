const video = document.getElementById('video'); 
const button = document.getElementById('button');
const button2 = document.getElementById('button2');
const canvas = document.getElementById('canvas');
//Definir tama;os base de la camara
const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
      facingMode: "environment"
    }, 
};
function guardar() {        
    var link = document.createElement('a')
    link.download = "foto.png";

    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}

function capturarFoto(){
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
}

function navegador(){
    if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("Camera API is not available in your browser");
        return;
    }
}

async function inicializarCamara() {
    //stopVideoStream();
    //constraints.video.facingMode = useFrontCamera ? "user" : "environment";
    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
    } catch (err) {
        alert("Could not access the camera");
    }
}

button.addEventListener('click',event =>{
    console.log("aiuda");
    navegador();
    inicializarCamara();
});

button2.addEventListener('click',event =>{
    capturarFoto();
    guardar();
});



