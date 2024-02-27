import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm'

const options = {
  mode: 'payment',
  amount: 100,
  currency: 'inr',
  appearance: {
  },
};

const Checkout = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PK);
  
  return (
    <div className='flex container mt-8'>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Checkout