
const express = require( 'express' );
const Stripe = require( 'stripe' );
const cors = require( 'cors' );


const app = express();

const stripe = new Stripe( "sk_test_51IJT3uJJae8H07HmTGs82fFAkLl9koB4b42l634kq8NMVyG6OO9J96bPipc3KPzeOhwTdWnij6jkl19WYMXM3ZfU00yMsc28ue" );

app.use( cors( { origin: "http://localhost:3000" } ) );
// para que entienda los objetos json que van llegando
app.use( express.json() );

app.post( '/api/checkout/', async ( req, res ) => {

    try {
        const { id, amount } = req.body;

        // registramo el pago
        const payment = await stripe.paymentIntents.create( {
            amount,
            currency: 'USD',
            description: "teclado",
            payment_method: id,
            confirm: true
        } );

        console.log( 'server post' );
        console.log( payment );
        // console.log( req.body );
        res.send( { message: 'Succesfull paymen' } );
    } catch ( error ) {
        console.log( error );
        res.json( { message: error.raw.message } );
    }
} );



app.listen( 3001, () => {
    console.log( 'server on port', 3001 );
} );