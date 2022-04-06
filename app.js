const { get } = require('http');
const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
var cron = require('node-cron')
// pad.flash = true


// const setbuttons = [
//     [{
//         x:6,
//         y:6,
//         command:'http://localhost:6969'
//     }]
// ]
// console.log(setbuttons[0].y)


pad.on( 'connect', () => console.log( 'Launchpad connected!' ) );
pad.connect().then( () => {     // Auto-detect Launchpad
    // pad.reset(3)
    pad.reset(0)
    pad.setColors([
        [6,6,pad.red],
        [6,7,pad.red]
    ]);





    



    pad.on( 'key', k => {
        console.log(pad.pressedButtons)
        console.log( `Key ${k.x},${k.y} down: ${k.pressed}`);
        // pad.col(pad.green, pad.pressedButtons)
        if(pad.isPressed([6,6])) {
            console.log('mute')
            get("http://localhost:6969/mute")
        }

        if(pad.isPressed([6,7])){
            console.log('deafen')
            get("http://localhost:6969/deafen")
        } else {
            
        }

    } );








} );

