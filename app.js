const { get } = require('http');
const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
var cp = require('child_process')
var robot = require('robotjs')
const setbuttons = {
    //add new buttons here, keep nulls as null.
    //{button's x, button's y, button's first color, button's second or "blink" color, button's current color, button's blinking state, button's blinker element}
    'buttonset':[

        {'x':6,'y':7,'name':'deafen','color':pad.red,'blink':pad.green,'currentcolor':null,'blinking':false},
        {'x':6,'y':6,'name':'mute','color':pad.red,'blink':pad.green,'currentcolor':null,'blinking':false},
        {'x':5,'y':7,'name':'tempdeafen','color':pad.red.low,'blink':pad.yellow,'currentcolor':null,'blinking':false},
        {'x':5,'y':6,'name':'tempmute','color':pad.red.low,'blink':pad.yellow,'currentcolor':null,'blinking':false},
        {'x':4,'y':0,'name':'chrome1','color':pad.amber,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':4,'y':1,'name':'chrome2','color':pad.amber,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':5,'name':'skip','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':4,'name':'play','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':3,'name':'back','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null}


    ]
}
pad.on( 'connect', () => console.log( 'Launchpad connected!' ) );
pad.connect().then( () => {     // Auto-detect Launchpad
pad.reset(0)
function buttoncolorer() {
    setbuttons.buttonset.forEach(element => {
        pad.col(element.color, [element.x, element.y])
        element.currentcolor = element.color
        console.log(element.currentcolor)
    });
}
buttoncolorer()




    pad.on( 'key', k => {
        console.log( `Key ${k.x},${k.y} down: ${k.pressed}`);
        setbuttons.buttonset.forEach(element => {
            if(k.x == element.x && k.y == element.y){
                console.log(element.name)



                //runs when you up or down the button
                //////////////////////////////////////////////
                if(element.name == 'tempmute'){
                    get("http://localhost:6969/mute")
                    switchcolor(k, element)
                }

                if(element.name == 'tempdeafen'){
                    get("http://localhost:6969/deafen")
                    switchcolor(k, element)
                }

                if(element.name == 'chrome1'){
                    switchcolor(k, element)
                }
                
                if(element.name == 'chrome2'){
                    switchcolor(k, element)
                }
                

                
                if(element.name == 'skip'){switchcolor(k, element)}   
                if(element.name == 'play'){switchcolor(k, element)}       
                if(element.name == 'pause'){switchcolor(k, element)}                
                if(element.name == 'back'){switchcolor(k, element)}
                //////////////////////////////////////////////



                if(k.pressed) { //runs when you down the button
                ///////////////////////////////////////////////
                    if(element.name == 'mute'){
                        get("http://localhost:6969/mute")
                        switchcolor(k, element)
                    }

                    if(element.name == 'deafen'){
                        get("http://localhost:6969/deafen")
                        switchcolor(k, element)
                    }

                    if(element.name == 'chrome1'){
                        robot.keyTap("2", ["command"])
                    }

                    if(element.name == 'chrome2'){
                        robot.keyTap("3", ["command"])
                    }


                    //music stuff                   //
                    if(element.name == 'skip'){     //
                        robot.keyTap("audio_next")  //
                    }                               //
                    if(element.name == 'play'){     //
                        robot.keyTap("audio_play")  //
                    }                               //
                    if(element.name == 'back'){     //
                        robot.keyTap("audio_prev")  //
                    }                               //

                ///////////////////////////////////////////////
                }



                if(!k.pressed) { //runs when you up the button
                //////////////////////////////////////////////
                    
                //////////////////////////////////////////////
                }
            }
        })





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





        //a function to switch between the two colors
        /////////////////////////////////////////////
        function switchcolor(k, element) {
            if(element.currentcolor == element.color) {
                pad.col(element.blink, k)

                element.currentcolor = element.blink
            } else {
                pad.col(element.color, k)
                element.currentcolor = element.color
            }
        }
        /////////////////////////////////////////////






        //a function to toggle blinking between the two colors
        //////////////////////////////////////////////////////
        function toggleblink(k, element, time) {
            if(element.blinking === false){
                element.blinking = true
                console.log('blink on')
                element.blinker = setInterval(() => {
                    switchcolor(k, element)
                }, time)
            } else if(element.blinking === true) {
                element.blinking = false
                clearInterval(element.blinker)
                pad.col(element.color, k)
                console.log('blink off')
            }
        }
        //////////////////////////////////////////////////////
    } );
} );

