prediction1="";
prediction2="";

Webcam.set({
    width:350,height:300,image_format:'png',png_quality:90
});
camera=document.getElementById("Webcam");
Webcam.attach(camera);
function takesnapshot()
{
Webcam.snap(function(data_uri)
{
    document.getElementById("Snapshot").innerHTML='<img src="'+data_uri+'" id="image">';

});
}
console.log(ml5.version);
emotionmodel=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GlaMuby0S/model.json',modelloaded);
function modelloaded()
{
    console.log("model loaded");
}
function load_model(){
    snapshotholder=document.getElementById("image");
    emotionmodel.classify(snapshotholder,gotresult);
}
 function gotresult(error,results)
 {
   if(error){
       console.error(error)
   }
   else{console.log(results);
    prediction1=results[0].label;
    prediction2=results[1].label;
    document.getElementById("result_emotion_name").innerHTML=prediction1;
    document.getElementById("result_emotion_name2").innerHTML=prediction2;

    speak();
    
}
 }
 function speak(){
    var synth=window.speechSynthesis;
    data1="prediction 1 is"+prediction1;
    data2="prediction 2 is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utterthis);
 }