const Launchpad = require( 'launchpad-mini' ),
pad = new Launchpad();
pad.flash = true
pad.on( 'connect', () => console.log( 'Launchpad connected!' ) );
pad.connect().then( () => {     // Auto-detect Launchpad
    pad.reset(0)


    //set colors here, colors are red green amber off yellow
    pad.col(pad.green.medium, [0,5])



    pad.on( 'key', k => {
        console.log( `Key ${k.x},${k.y} down: ${k.pressed}`);

        if(pad.isPressed([0,5])) {
            console.log('chrome')
        }


    } );
} );

