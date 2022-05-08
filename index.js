var cards = document.getElementById('card');
var levelNum = 0; 
let t = 0,k = 0,flips = 0;
let arr = [];
let click = [];
document.getElementsByClassName('tileF')[0].addEventListener('click',function(event){
    document.getElementsByClassName('tileF')[0].classList.toggle('before-turn');
    document.getElementsByClassName('tileF')[0].classList.toggle('after-turn');
    document.getElementById('bt1').classList.toggle('hidden');
    document.getElementById('at1').classList.toggle('hidden');
    document.getElementById('hideF').classList.toggle('hidden');
    event.stopImmediatePropagation();
})

document.getElementsByClassName('tileI')[0].addEventListener('click',function(event){
    document.getElementsByClassName('tileI')[0].classList.toggle('before-turn');
    document.getElementsByClassName('tileI')[0].classList.toggle('after-turn');
    document.getElementById('bt2').classList.toggle('hidden');
    document.getElementById('at2').classList.toggle('hidden');
    document.getElementById('hideI').classList.toggle('hidden');
    event.stopImmediatePropagation();
})

document.getElementsByClassName('tileP')[0].addEventListener('click',function(event){
    document.getElementsByClassName('tileP')[0].classList.toggle('before-turn-I');
    document.getElementsByClassName('tileP')[0].classList.toggle('after-turn-I');
    document.getElementById('bt3').classList.toggle('hidden');
    document.getElementById('at3').classList.toggle('hidden');
    event.stopImmediatePropagation();
})

for(let i=0;i<3;i++){
    document.getElementsByClassName('level')[i].addEventListener('click',function(){
        document.getElementById('card').classList.add('scale-0');
        levelNum = parseInt(document.getElementsByClassName('level')[i].getAttribute('levelNum'));
        console.log(levelNum);
        document.getElementById('card').addEventListener('transitionend',function(){
            document.getElementById('card').classList.toggle('hidden');
            document.getElementById('info').classList.toggle('hidden');
            document.getElementById('gameScreen').classList.toggle('hidden');
            createGame(levelNum);
            clickReverse();
            randomNumCreator();
            addImages();
        },{once:true})
    })
}

function createGame(levelNum){
   for(let i=1;i<=levelNum;i++){
        document.getElementById(i).classList.toggle('hidden');
   }
}

function clickReverse(){
    for(let i=1;i<=levelNum;i++){
        document.getElementById(i).addEventListener('click',function(event){
            flips++;
            console.log(flips);
            document.getElementById(i).classList.toggle('card-at');
            document.getElementById(i).classList.toggle('card-bt');
            click.push(i);
            if(document.getElementById(i).classList.contains('card-at')){
                t++;
                if(t===2){
                    document.getElementById(i).addEventListener('transitionend',function(){
                        if(arr[click[0]-1]===arr[click[1]-1]){
                            document.getElementById(click[0]).style.visibility = "hidden";
                            document.getElementById(click[1]).style.visibility = "hidden";
                            // document.getElementById(click[1]).style.transitionDuration = "1000ms";
                            document.getElementById(click[1]).style.transition = "transform";
                            document.getElementById(click[1]).style.transitionProperty = "all";
                            // document.getElementById(click[0]).style.transitionDuration = "1000ms";
                            document.getElementById(click[0]).style.transition = "transform";
                            document.getElementById(click[0]).style.transitionProperty = "all";
                            click.length = 0;
                            t=0;
                            k+=2;
                            if(k===levelNum){
                                document.getElementById('gameScreen').classList.toggle('hidden');
                                document.getElementById('card').classList.toggle('hidden');
                                document.getElementById('info').classList.toggle('hidden');
                                document.getElementById('card').classList.toggle('scale-0');
                                gameReset();
                            }
                        }

                        else{
                            document.getElementById(click[0]).classList.toggle('card-at');
                            document.getElementById(click[0]).classList.toggle('card-bt');
                            document.getElementById(click[0]).style.backgroundImage = "";
                            document.getElementById(click[1]).classList.toggle('card-at');
                            document.getElementById(click[1]).classList.toggle('card-bt');
                            document.getElementById(click[1]).style.backgroundImage = "";
                            click.length = 0;
                            t=0;
                        }
                    },{once:true})
                }
            }

            else{
                t=0;
            }
        })
    }
}

function toggle(z){
    document.getElementById(z).classList.toggle('card-at');
    document.getElementById(z).classList.toggle('card-bt');
}

function randomNumCreator(){
    while(arr.length < levelNum){
        var r = Math.floor(Math.random()*levelNum)+1;
        if(arr.indexOf(r) === -1){
            arr.push(r);
        }
    }
    for(let a=0;a<levelNum;a++){
        if(arr[a]>levelNum/2){
            arr[a] = arr[a]-levelNum/2;
        }
    }
}

function addImages(){
    for(let i=1;i<=levelNum;i++){
        document.getElementById(i).addEventListener('click',function(){
            if(document.getElementById(i).classList.contains('card-at')){
                document.getElementById(i).style.backgroundImage = "url('images/"+arr[i-1]+".png')"
            }

            else{
                document.getElementById(i).style.backgroundImage = "";
            }
        })
    }
}

function gameReset(){
    flips+=parseInt(document.cookie.flips);
    document.cookie = "flips = "+flips;
    document.getElementById('totalf').innerText = document.cookie.flips;
    console.log(document.cookie);
    location.reload();
}