import React, { useState, useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Switch,
} from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';



function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // const [username, setUsername] = useState('');

  const [signedIn, setSignedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  // useState = varible in REACT
  // useEffect = run code on a condition in REACT

  useEffect(() => {
    // run onnce the when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc => ({id: doc.id, message: doc.data()}))));
      });
  }, []); // condition

  useEffect(() => {
    // const username = promt('Please endter username')
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // all the logic to send a message goes here
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const authenticate = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Hello Clever Programmers!</h1>
      {signedIn ? (
        <div>
          <h2>Welcome {username}</h2>

          <form className="app__form">
            <FormControl className="app__formControl">
              <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}/>
              <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
       <SendIcon /> 
      </IconButton> 
            </FormControl>
          </form>

          <FlipMove>
            {messages.map(({id, message}) => (
              <Message key={id} username={username} message={message} />
            ))}
          </FlipMove>
        </div>
      ) : (
        <div>
          <InputLabel>Have an account?</InputLabel>
          <Switch
            checked={hasAccount}
            onChange={(event) => {
              setHasAccount(event.target.checked);
            }}
          ></Switch>
          <h4>{hasAccount ? "Sign In" : "Sign  up"}</h4>
          <form>
            {!hasAccount && (
              <FormControl>
                <InputLabel>Enter Name</InputLabel>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </FormControl>
            )}
            <FormControl>
              <InputLabel>Enter Email</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Enter Password</InputLabel>
              <Input
                value={input}
                type="password"
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <Button
              disabled={!input}
              variant="contained"
              color="primary"
              type="submit"
              onClick={sendMessage}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
