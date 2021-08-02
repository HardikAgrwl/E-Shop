import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLISHABLE =
  "pk_test_51JIubtSBFmXAzJPtKkQ15AwtLESu3YaSgIkjHyYPHBmh8X5Y2ium4ToZqtwCkODdHbr06Jgm6XGarL6taank1iK600lmimbOCV";

const onToken = (user, checkout) => (token) => checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) => (
  <StripeCheckout
    amount={amount * 100}
    token={onToken(user, checkout)}
    currency="INR"
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
