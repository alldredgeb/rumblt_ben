import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { auth, db } from '../../firebase';
import axios from 'axios';

import './Signup.css'
export const DASHBOARD = '/dashboard';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  name: '',
  username: '',
  email: '',
  userid: '',
  blogtitle:'',
  passwordOne: '',
  passwordTwo: ''
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.setUser = this.setUser.bind(this);
  }

  setUser () {
    let  {userid, name, username, blogtitle} = this.state;
       console.log(this.state);
        axios.post('/api/users/', {userid, name, username, blogtitle})
}


  onSubmit = (event) => {
    const {
      name,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, name, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.setState({userid: authUser.user.uid});
            console.log(this.state.userid);
            history.push(DASHBOARD);
            
          })
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();

  }

  // handleInputChange (event) {
  //   this.setState({[event.target.name]: event.target.value});
  //   console.log(this.state.blogtitle);
  // }

  render() {
    const {
      name,
      email,
      username,
      blogtitle,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      name === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={name}
          onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <br />
        <input 
        value={username}
        onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
        type='text'
        placeholder='Username'
        />
        <br />
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <input 
        value={blogtitle}
        onChange={event => this.setState(updateByPropertyName('blogtitle', event.target.value))}
        type='text'
        placeholder='Name your blog!'
        />
        <br />
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}
export default SignUpForm;