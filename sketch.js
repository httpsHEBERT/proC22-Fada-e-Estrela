var tecla1, tecla2, tecla3,  w, a, s, d;
var estrelaS, estrelaB, estrela;
var fada, fadaImg, música;
var estado = "parada";
var fundo, fundoImg;
var engine, world;

const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

function preload(){

    fadaImg = loadAnimation("Images/Fada/fada1.png", "Images/Fada/fada2.png");
    estrela = loadImage("Images/Estrela/estrela.png");////////////////////////
	fundoImg = loadImage("Images/Cenário/fundo.jpg");/////////////////////////
    w = loadAnimation("Images/Teclas/w.png");/////////////////////////////////
    a = loadAnimation("Images/Teclas/a.png");/////////////////////////////////
    s = loadAnimation("Images/Teclas/s.png");/////////////////////////////////
    d = loadAnimation("Images/Teclas/d.png");/////////////////////////////////

    música = loadSound("Sound/música.mp3");/////////////////////////////////
}

function setup(){

    createCanvas(windowWidth, windowHeight-4);
    engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

    fundo = createSprite(width/2, height/2-60);
    fundo.addImage(fundoImg);
    fundo.scale = 0.6;

    tecla1 = createSprite(width-width+50, height-height+50);
    tecla1.addAnimation("tecla", a);
    tecla1.scale = 0.2;

    tecla2 = createSprite(width-width+50, height-height+130);
    tecla2.addAnimation("tecla", d);
    tecla2.scale = 0.2;

    tecla3 = createSprite(width-width+50, height-height+280);
    tecla3.addAnimation("tecla", w);
    tecla3.addAnimation("tecla", s);
    tecla3.scale = 0.2;

    fada = createSprite(width/2, height-170);
    fada.addAnimation("fada", fadaImg);
    fada.scale = 0.2;

    estrelaS = createSprite(width/2, height-height+70);
	estrelaS.addImage(estrela);
	estrelaS.scale = 0.2;

	estrelaB = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, estrelaB);

    //música.loop();
}

function draw(){

    background(0);//
    cair();/////////
    área();/////////
    errou();////////
    pegar();////////
    voltar();///////
    posição();//////
    tutorial();/////
    movimento();////
    drawSprites();//
}

/////////////////////////////////////////////////////////////
function tutorial(){ ///mostrar as teclas a serem apertadas//

    if(estado == "parada"){
        tecla3.addAnimation("tecla", s);
        tecla1.visible = true;
        tecla2.visible = true;
        tecla3.visible = true;
    }else if(estado == "noAr"){
        tecla1.visible = false;
        tecla2.visible = false;
        tecla3.visible = false;
    }else{
        tecla3.addAnimation("tecla", w);
        tecla1.visible = true;
        tecla2.visible = true;
        tecla3.visible = true;
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function posição(){ ////posição da estrela///////////////////

    estrelaS.y = estrelaB.position.y;

    if(estado == "parada" || estado == "noAr"){
       estrelaS.x = estrelaB.position.x;
    }else{
        estrelaS.x = estrelaB.position.x = fada.x + 115; 
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function movimento(){ //move a fada//////////////////////////

    if(keyDown("a") || keyDown("LEFT_ARROW")){
        fada.x -= 20;
    }

    if(keyDown("d") || keyDown("RIGHT_ARROW")){
        fada.x += 20;
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function área(){ //////impede a fada de sair da tela/////////

    if(fada.x <= width-width+110){
        fada.x = width-width+110;
    }

    if(fada.x >= width-110){
        fada.x = width-110;
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function cair(){ //////faz a etrela cair/////////////////////

    if((keyDown("space") || keyDown("s") || keyDown("DOWN_ARROW")) &&
        estado == "parada"){

        Matter.Body.setStatic(estrelaB, false);
        estado = "noAr";
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function pegar(){ /////para a estrela na mão da fada/////////

    if(estrelaS.y >= height/2+100 && estrelaB.position.y >= height/2+100 &&
       estrelaS.y <= height-150 && estrelaB.position.y <= height-150 &&
       fada.x >= estrelaS.x - 125 && fada.x <= estrelaS.x - 80){

        Matter.Body.setStatic(estrelaB, true);
        estado = "segurando";
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function voltar(){ ////faz a estrela voltar lá pra cima//////

    if(estado == "segurando" && (keyDown("w") || keyDown("UP_ARROW"))){

        estrelaB.position.x = Math.round(random(width-width+260, width-70));
        estrelaB.position.y = height-height+70;
        estado = "parada";
    }
}////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function errou(){ /////quando a fada não pega a estrela//////
    
    if(estrelaS.y > height && estrelaB.position.y > height){
         
        estrelaB.position.x = Math.round(random(width-width+260, width-70));
        estrelaB.position.y = height-height+70;
        Matter.Body.setStatic(estrelaB, true);
        estado = "parada";
    }
}////////////////////////////////////////////////////////////