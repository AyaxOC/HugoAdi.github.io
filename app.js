const video = document.getElementById('video'); 
const button = document.getElementById('button');
const button2 = document.getElementById('button2');
const canvas = document.getElementById('canvas');

//Definir tamaños base de la camara
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

//Almacena la imagen tomada por la aplicacion en formatro .png
function guardar() {        
    var link = document.createElement('a')
    link.download = "foto.png";

    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}

//Captura la actual imagen del canvas
function capturarFoto(){
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
}

//Determina el tipo de navegador que usas y si el uso de la camara es compatible o no
function navegador(){
    if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("Camera API is not available in your browser");
        return;
    }
}

//Se encarga de iniciar la aplicacion de la camara, la activa y comienza el video
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

//Evento añadido al boton para comenzar a tomar imagen de la camara tracera, mandando a llamar a las funciones navegador e inicializar
button.addEventListener('click',event =>{
    console.log("aiuda");
    navegador();
    inicializarCamara();
});

//Evento añadido al boton para tomar la foto del canvas
button2.addEventListener('click',event =>{
    capturarFoto();
    guardar();
});



