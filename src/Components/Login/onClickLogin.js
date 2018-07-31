import React, { Component } from 'react';
import { auth } from  '../../firebase';
// import {Link} from 'react-router-dom';


const SignInPage = ({ history }) =>
  <div>
    <br/>
    <SignInForm history={history} />

  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    // const {
    //   history,
    // } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((u) => {
        this.setState(() => ({ ...INITIAL_STATE }));
       if(u.user.uid){window.location.href = "/#/dashboard"} 
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
          />
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default SignInPage;

export {
  SignInForm,
};
