const { get } = require('http');
const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
var cron = require('node-cron')

const setbuttons = {
    'buttonset':[
        {'x':0, 'y':7, 'name':'testing', 'color':pad.yellow,'blink':pad.yellow.low},
        {'x':0, 'y':6, 'name':'notesting', 'color':pad.green.low,'blink':pad.green},
        {'x':6,'y':7,'name':'deafen','color':pad.red,'blink':pad.red.low},
        {'x':6,'y':6,'name':'mute','color':pad.red,'blink':pad.red.low},
        {'x':5,'y':7,'name':'tempdeafen','color':pad.red.low,'blink':pad.red},
        {'x':5,'y':6,'name':'tempmute','color':pad.red.low,'blink':pad.red}
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

    setbuttons.buttonset.forEach(element => {
        console.log(element)
        pad.col(element.color, [element.x, element.y])
    });


    pad.on( 'key', k => {
        // console.log(pad.pressedButtons)
        console.log( `Key ${k.x},${k.y} down: ${k.pressed}`);
        setbuttons.buttonset.forEach(element => {
            if(k.x == element.x && k.y == element.y){
                console.log(element.name)


                if(k.pressed) {
                    if(element.name == 'mute'){
                        get("http://localhost:6969/mute")
                    }

                    if(element.name == 'deafen'){
                        get("http://localhost:6969/deafen")
                    }
                }





                if(element.name == 'tempmute'){
                    get("http://localhost:6969/mute")
                }

                if(element.name == 'tempdeafen'){
                    get("http://localhost:6969/deafen")
                }
            }
        })






        // pad.col(pad.green, pad.pressedButtons)
        // if(pad.isPressed([6,6])) {
        //     console.log('mute')
        //     get("http://localhost:6969/mute")
        //     // flashing = !flashing
        // }

        // if(pad.isPressed([6,7])){
        //     console.log('deafen')
        //     // flashing = !flashing
        //     get("http://localhost:6969/deafen")
        // }


        

        // pad.flash = flashing
    } );








} );

