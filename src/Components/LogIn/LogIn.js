import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { googleSignIn, googleSignOut, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './ManageLogin';
import './logIn.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

initializeLoginFramework();

function LogIn() {
  const [ , setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  });
  const [newUser, setNewUser] = useState(false);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        setUser(res)
        setLoggedInUser(res);
        history.replace(from);
      })
  }
  const handleGoogleSignOut = () => {
    googleSignOut()
      .then(res => {
        setUser(res)
        setLoggedInUser(res);
      })

  }
  


  //validation section
  const handleOnchange = (event) => {
    const test = event.target.value;
    console.log(test, event.target.value)
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
      console.log(isFormValid)
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordNumber = /\d{1}/.test(event.target.value)
      isFormValid = isPasswordValid && isPasswordNumber
    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value; //why here[ ] the bracket used
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res)
          setLoggedInUser(res);
          history.replace(from);
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(res)
          setUser(res)
          setLoggedInUser(res);
          history.replace(from);
        })

    }

  }


  return (
    <div className="logInCls">
      <div>
        <h3>Create Or LogIn your account</h3>
     
        <form action="" onSubmit={handleSubmit}>
          {
            newUser ? <h2>Create You Account</h2> : <h2>Log In</h2>
          }
          {
            newUser && <input type="text" name="name" id="" onBlur={handleOnchange} placeholder="Type Name" />
          }
          <br />
          <input type="text" name="email" id="" required onBlur={handleOnchange} placeholder="Type Email" />
          <br />
          <input type="password" name="password" id="" required onBlur={handleOnchange} placeholder="Type Password" />
          <br />
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
          {
            <Link onClick={() => setNewUser(!newUser)}> {newUser ? <p>Log In</p> : <p>Create New Account</p>} </Link>
          }
        </form>
        {
          user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign Out</button> : <button type="button" className="btn btn-primary btn-lg" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> SignIn with Google</button>

        }
        <br />
        
        {
          user.success ? <p style={{ color: "green" }}>Your  have been {newUser ? 'Created your account' : 'signed in'} successfully </p> : <p style={{ color: "red" }}>{user.error}</p>
        }

      </div>
    </div>
  );
}

export default LogIn;
