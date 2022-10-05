import { useState } from "react";
import styled from "styled-components";
import AuthInput from "../components/auth/AuthInput";
import { media, shadow } from "../assets/style/styleUtil";

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
              <AuthInput
                key={idx}
                value={value[idx]}
                onChange={handleData}
                {...props}
              />
            );
          })}
          <SubmitBtn>로그인</SubmitBtn>
        </Form>
        <HelpCon>
          <CreateCon>
            <a href="/create">회원 가입</a>
          </CreateCon>
          <SearchCon>
            <a href="/search">계정 찾기</a>
          </SearchCon>
        </HelpCon>
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
  /* background: #d7e6f8; */
  background: rgba(200, 240, 210, 0.9);

  ${media.xl`
  width : 100%;
  `}
`;
const Column = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
`;

const Title = styled.h1`
  color: #555;
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
  border-radius: 5px;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    ${shadow(0)};
    color: rgb(21, 177, 125);
    background-color: aliceblue;
  }

  &:active {
    ${shadow(1)};
  }
`;

const HelpCon = styled.div`
  margin: 5rem 0;
  padding: 2rem 0 0 0.5rem;
  border-top: solid 1px #999;
  color: #333;
  text-align: left;
  font-size: 1.4rem;

  a {
    &:hover {
      border-bottom: solid 1px cadetblue;
      font-weight: bold;
    }
  }
`;
const CreateCon = styled.div`
  margin-bottom: 0.5rem;
`;
const SearchCon = styled.div``;
