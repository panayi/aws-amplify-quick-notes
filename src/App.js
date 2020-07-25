import React, { useEffect, useState } from "react";
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";
import Screens from "./components/Screens";
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const Title = styled("h1")`
  text-align: center;
  text-transform: uppercase;
  color: #a7d7c5;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px"
  },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: "4px"
  },
  sectionHeader: {
    color: "#74b49b"
  },
  sectionFooterSecondaryContent: {
    color: "#303952"
  },
  inputLabel: {
    color: "#74b49b"
  },
  input: {
    backgroundColor: "#f4f9f4",
    color: "#74b49b"
  },
  hint: {
    color: "#74b49b"
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "#a7d7c5"
  },
  a: {
    color: "#a7d7c5"
  }
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Screens />
  ) : (
    <>
      <Title>Quick Notes</Title>
      <Authenticator
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        theme={theme}
      />
    </>
  );
}

export default App;
