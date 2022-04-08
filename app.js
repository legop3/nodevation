const { get } = require('http');
const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
var cron = require('node-cron')

const setbuttons = {
    'buttonset':[
        {'x':0, 'y':7, 'name':'blinktest', 'color':pad.yellow,'blink':pad.red,'currentcolor':null},
        {'x':0, 'y':6, 'name':'blink2', 'color':pad.green.low,'blink':pad.green,'currentcolor':null},
        {'x':6,'y':7,'name':'deafen','color':pad.red,'blink':pad.green,'currentcolor':null},
        {'x':6,'y':6,'name':'mute','color':pad.red,'blink':pad.green,'currentcolor':null},
        {'x':5,'y':7,'name':'tempdeafen','color':pad.red.low,'blink':pad.yellow,'currentcolor':null},
        {'x':5,'y':6,'name':'tempmute','color':pad.red.low,'blink':pad.yellow,'currentcolor':null}
    ]
}
// console.log(setbuttons.buttons)




pad.on( 'connect', () => console.log( 'Launchpad connected!' ) );
pad.connect().then( () => {     // Auto-detect Launchpad
    // pad.reset(3)
    pad.reset(0)
    // pad.writeBuffer = 0
    // pad.setColors([
    //     [6,6,pad.red],
    //     [6,7,pad.red]
    // ]);
    // pad.writeBuffer = 1
    // pad.setColors([
    //     [6,6,pad.red.low],
    //     [6,7,pad.red.low]
    // ])
    //    pad.col(1,1,pad.red)

function buttoncolorer() {
    setbuttons.buttonset.forEach(element => {
        // console.log(element)
        pad.col(element.color, [element.x, element.y])
        element.currentcolor = element.color
        console.log(element.currentcolor)
    });
}
buttoncolorer()




    pad.on( 'key', k => {
        // console.log(pad.pressedButtons)
        console.log( `Key ${k.x},${k.y} down: ${k.pressed}`);
        setbuttons.buttonset.forEach(element => {
            if(k.x == element.x && k.y == element.y){
                console.log(element.name)


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

                    if(element.name == 'blinktest'){
                        setInterval(switchcolor, 1000, k, element)
                    }

                    if(element.name == 'blink2'){
                        setInterval(switchcolor, 100, k, element)
                    }
                ///////////////////////////////////////////////
                }



                if(!k.pressed) { //runs when you up the button
                //////////////////////////////////////////////
                    
                //////////////////////////////////////////////
                }




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
                //////////////////////////////////////////////
            }
        })


        function switchcolor(k, element) {
            // console.log(k)
            // console.log(element)
            // console.log(pad.col(k))
            console.log(k, element)

            if(element.currentcolor == element.color) {
                pad.col(element.blink, k)
                element.currentcolor = element.blink
            } else {
                pad.col(element.color, k)
                element.currentcolor = element.color
            }
        }










    } );
} );

