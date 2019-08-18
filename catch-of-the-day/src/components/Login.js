import React from 'react';
import PropTypes from 'prop-types';

/*
    Because this is a stateless functional component we need to pass props into
    the method. We also don't use this. because it is passed in as a paramater
  */
const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manager your stores Inventory</p>
    <button className="github" onClick={() => props.authenticate('Github')}>
      Log in with Github
    </button>
    <button className="twitter" onClick={() => props.authenticate('Twitter')}>
      Log in with Twitter
    </button>
    <button className="facebook" onClick={() => props.authenticate('Facebook')}>
      Log in with Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
