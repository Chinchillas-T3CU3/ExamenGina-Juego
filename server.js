const port=3000;
const express=require('express');
const app=express();

app.use(express.static(__dirname+'/'));
app.listen(port,function(){
    console.log("escuchando en el puerto 3000")
})