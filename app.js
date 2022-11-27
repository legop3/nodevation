const { get } = require('http');
const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
var cp = require('child_process')
var robot = require('robotjs')
const open = require('open');
const delay = require('delay');
const displayRotationWindows = require('display-rotation-windows');

var wait = 50

const setbuttons = {
    //add new buttons here, keep nulls as null.
    //{button's x, button's y, button's first color, button's second or "blink" color, button's current color, button's blinking state, button's blinker element}
    'buttonset':[

        {'x':6,'y':7,'name':'deafen','color':pad.red,'blink':pad.green,'currentcolor':null,'blinking':false},
        {'x':6,'y':6,'name':'mute','color':pad.red,'blink':pad.green,'currentcolor':null,'blinking':false},
        {'x':5,'y':7,'name':'tempdeafen','color':pad.red.low,'blink':pad.yellow,'currentcolor':null,'blinking':false},
        {'x':5,'y':6,'name':'tempmute','color':pad.red.low,'blink':pad.yellow,'currentcolor':null,'blinking':false},
        {'x':4,'y':2,'name':'chrome1','color':pad.amber,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':4,'y':3,'name':'chrome2','color':pad.yellow,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':5,'name':'skip','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':4,'name':'play','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':5,'y':3,'name':'back','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':8,'y':5,'name':'wintab','color':pad.red.low,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':8,'y':6,'name':'prevdesk','color':pad.yellow,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':8,'y':7,'name':'nextdesk','color':pad.yellow,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':3,'y':2,'name':'youtube','color':pad.red,'blink':pad.red.low,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':2,'y':2,'name':'reddit','color':pad.amber,'blink':pad.amber.low,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':1,'y':5,'name':'closetab','color':pad.red.low,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':1,'y':4,'name':'nexttab','color':pad.green.low,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':1,'y':3,'name':'prevtab','color':pad.green.low,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':3,'y':4,'name':'altf4','color':pad.red,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':4,'y':4,'name':'spotify','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':3,'y':8,'name':'volumeup','color':pad.green,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':2,'y':8,'name':'volumedown','color':pad.green,'blink':pad.red,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':2,'y':0,'name':'volumemute','color':pad.red,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':0,'y':6,'name':'speeddown','color':pad.red,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':0,'y':7,'name':'speedup','color':pad.green,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':3,'y':6,'name':'rotatevertical','color':pad.yellow,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null},
        {'x':3,'y':7,'name':'rotatehorizontal','color':pad.yellow,'blink':pad.yellow,'currentcolor':null,'blinking':false,'blinker':null}
        // {'x':3,'y':5,'name':'lock','color':pad.yellow,'blink':pad.green,'currentcolor':null,'blinking':false,'blinker':null}




    ]
}
pad.on( 'connect', () => console.log( 'Launchpad connected!' ) );
pad.connect().then( () => {     // Auto-detect Launchpad
pad.reset(0);

(async () => {

    while(true){
        pad.col(pad.off, [7,7])
        pad.col(pad.green, [7,0])
        await delay(wait);
        pad.col(pad.off, [7,0])
        pad.col(pad.green, [7,1])
        await delay(wait);
        pad.col(pad.off, [7,1])
        pad.col(pad.green, [7,2])
        await delay(wait);
        pad.col(pad.off, [7,2])
        pad.col(pad.green, [7,3])
        await delay(wait);
        pad.col(pad.off, [7,3])
        pad.col(pad.green, [7,4])
        await delay(wait)
        pad.col(pad.off, [7,4])
        pad.col(pad.green, [7,5])
        await delay(wait)
        pad.col(pad.off, [7,5])
        pad.col(pad.green, [7,6])
        await delay(wait)
        pad.col(pad.off, [7,6])
        pad.col(pad.green, [7,7])
        await delay(wait)
    }



})();





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

                if(element.name == 'chrome1'){switchcolor(k, element)}
                if(element.name == 'chrome2'){switchcolor(k, element)}
                if(element.name == 'youtube'){switchcolor(k, element)}
                if(element.name == 'reddit'){switchcolor(k, element)}
                if(element.name == 'closetab'){switchcolor(k, element)}
                if(element.name == 'altf4'){switchcolor(k, element)}
                if(element.name == 'nexttab'){switchcolor(k, element)}
                if(element.name == 'prevtab'){switchcolor(k, element)}
                if(element.name == 'spotify'){switchcolor(k, element)}


                //music stuff/////////////////////////////////////
                if(element.name == 'skip'){switchcolor(k, element)}   
                if(element.name == 'play'){switchcolor(k, element)}              
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
                    
                    if(element.name == 'spotify'){
                        robot.keyTap("5", ["command"])
                    }



                    if(element.name == 'youtube'){open('https://youtube.com');}
                    if(element.name == 'reddit'){open('https://reddit.com');}
                    if(element.name == 'closetab'){robot.keyTap("w", ["control"])}
                    if(element.name == 'nexttab'){robot.keyTap("tab", ["control"])}
                    if(element.name == 'prevtab'){robot.keyTap("tab", ["control", "shift"])}
                    // if(element.name == 'lock'){robot.keyTap("l", ["command"])}





                    //virtual desktop switching//////////////////////////////////////////////////
                    if(element.name == 'wintab'){robot.keyTap("tab", ["command"])}
                    if(element.name == 'prevdesk'){robot.keyTap("left", ["command", "control"])}
                    if(element.name == 'nextdesk'){robot.keyTap("right", ["command", "control"])}

                    //music stuff/////////////////////////////////////////
                    if(element.name == 'skip'){robot.keyTap("audio_next")}                               
                    if(element.name == 'play'){robot.keyTap("audio_play")}                               
                    if(element.name == 'back'){robot.keyTap("audio_prev")}
                    
                    if(element.name == 'altf4'){robot.keyTap("f4", ["alt"])}
                    if(element.name == 'volumeup'){robot.keyTap("audio_vol_up")}
                    if(element.name == 'volumedown'){robot.keyTap("audio_vol_down")}
                    if(element.name == 'volumemute'){robot.keyTap("audio_mute")}
                    //blinking light speed
                    if(element.name == 'speedup'){wait = wait - 10; console.log(wait)}
                    if(element.name == 'speeddown'){wait = wait + 10; console.log(wait)}

                    //screen rotation
                    if(element.name == 'rotatevertical'){displayRotationWindows.rotateCCW()}
                    if(element.name == 'rotatehorizontal'){displayRotationWindows.rotateCW()}



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

