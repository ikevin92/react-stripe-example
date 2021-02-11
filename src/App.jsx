import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


// importamos boostrap
import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react';
import './App.css';

// declamaramos la conexion con stripe
const stripePromise = loadStripe( 'pk_test_51IJT3uJJae8H07HmhGN7sXdLetF1Tb4hDawv1All84LOXApwZwOir77UxOx18xYglnpjdN5Oz5kGfE1u1dibMylq00Yf2QXzru' );





// declaracion del formulario
const CheckoutForm = () => {

    //hook que me retorna la conexion a triple
    const stripe = useStripe();
    const elements = useElements();
    // hook para loading
    const [ loading, setLoading ] = useState( false );

    // funcion del boton del formulario
    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod( {
            type: 'card',
            card: elements.getElement( CardElement ) // capturta lo del  element

        } );

        setLoading( true );


        if ( !error ) {
            // console.log( paymentMethod );
            const { id } = paymentMethod;

            console.log( id );

            try {
                const { data } = await axios.post( 'http://localhost:3001/api/checkout/', {
                    id,
                    amount: 100000
                } );

                console.log( data );
                elements.getElement( CardElement ).clear();
            } catch ( error ) {
                console.log( error );
            }

            // limpiamos el campo de la tarjeta0

            setLoading( false );
        }

    };

    return (
        <form onSubmit={ handleSubmit } className="card card-body" >
            <img
                src="https://www.corsair.com/medias/sys_master/images/images/h5d/h22/9030723403806/-CH-9104110-SP-Gallery-Strafe-Mk2-RGB-01.png"
                alt="k68kb"
                className="img-fluid"
            />
            <h3 className="text-center my-2">Price: 100$</h3>

            <div className="form-group">
                <CardElement className="form-control" />
            </div>



            <button className="btn btn-success" disabled={ !stripe }>
                {
                    loading ?

                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>

                        : 'Comprar'

                }

            </button>


        </form>
    );
};


function App () {
    return (
        <Elements stripe={ stripePromise }>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    );
}

export default App;
