import { useState } from "react";
import styled from "styled-components";
import AuthInput from "../components/auth/AuthInput";

const inputProps = [
  {
    htmlFor: "email",
    text: "이메일을 입력 하세요.",
    type: "text",
    name: "email",
    placeholder: "Enter your email...",
    minLength: "0",
    maxLength: "100",
  },
  {
    htmlFor: "password",
    text: "비밀번호를 입력 하세요.",
    type: "password",
    name: "password",
    placeholder: "Enter your password...",
    minLength: "0",
    maxLength: "100",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  const handleData = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Container>
      <Column>
        <Title>animal hospital</Title>
        <Form onSubmit={handleLogin}>
          {inputProps.map((props, idx) => {
            const value = [email, password];
            return (
              <AuthInput value={value[idx]} onChange={handleData} {...props} />
            );
          })}
        </Form>
        <SubmitBtn>로그인</SubmitBtn>
      </Column>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  width: 120rem;
  height: 80rem;
  margin: 5rem auto;
  text-align: center;
  font-family: "Cormorant", serif;
  font-size: 2rem;
  background: #e2eeef;
`;
const Column = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.75rem;
  letter-spacing: 0.2rem;
`;

const Form = styled.form``;

const SubmitBtn = styled.button`
  width: 40rem;
  padding: 0.65rem 0;
  color: black;
  background: beige;
  border: solid 2px lightgray;
  font-weight: bold;
`;
