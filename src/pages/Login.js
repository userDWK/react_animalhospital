import { useState } from "react";
import styled from "styled-components";
import AuthInput from "../components/auth/AuthInput";
import { media, shadow } from "../assets/style/styleUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import { authService } from "../fbase";

const loginProps = [
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

const createProps = [
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
  {
    htmlFor: "checkPassword",
    text: "비밀번호를 재입력 하세요.",
    type: "password",
    name: "checkPassword",
    placeholder: "Enter your password...",
    minLength: "0",
    maxLength: "100",
  },
  {
    htmlFor: "nick",
    text: "사용할 닉네임을 입력하세요.",
    type: "text",
    name: "nick",
    placeholder: "Enter your nickname...",
    minLength: "0",
    maxLength: "100",
  },
  {
    htmlFor: "phone",
    text: "휴대폰 번호를 입력하세요.",
    type: "number",
    name: "phone",
    placeholder: "Enter your phone number( - 생략)...",
    minLength: "0",
    maxLength: "100",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation().pathname.slice(1);

  const handleData = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "checkPassword") {
      setCheckPassword(value);
    } else if (name === "nick") {
      setNick(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  const handleForm = async (e) => {
    if (location === "login") {
    } else if (location === "create") {
      if (password !== checkPassword) return;

      try {
        authService.createUserWithEmailAndPassword(email, password);
      } catch (e) {
        console.error(e);
      }
      setEmail("");
      setPassword("");
      setCheckPassword("");
      setNick("");
      setPhone("");
    }
  };

  return (
    <Container>
      <Column>
        <Title>{location === "login" ? "Sign In" : "Create Account"}</Title>
        <Form onSubmit={handleForm}>
          {(location === "login" ? loginProps : createProps).map(
            (props, idx) => {
              // const value = [email, password];
              const value = [email, password, checkPassword, phone, nick];
              return (
                <AuthInput
                  key={props.name}
                  value={value[idx]}
                  onChange={handleData}
                  {...props}
                />
              );
            }
          )}

          <SubmitBtn>{location === "login" ? "로그인" : "계정 생성"}</SubmitBtn>
        </Form>
        {location === "login" && (
          <FootBox>
            <HelpCon>
              <CreateCon>
                <a href="/create">회원 가입</a>
              </CreateCon>
              <SearchCon>
                <a href="/search">계정 찾기</a>
              </SearchCon>
            </HelpCon>
            <SocialCon>
              <Google>
                <FontAwesomeIcon icon={faGoogle} />
                <GoogleText>Google Login</GoogleText>
              </Google>
              <FaceBook>
                <FontAwesomeIcon icon={faFacebookF} />
                <FacebookText>Facebook Login</FacebookText>
              </FaceBook>
            </SocialCon>
          </FootBox>
        )}
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

const FootBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5rem 0;
  padding: 2rem 1rem;
  border-top: solid 1px #999;
`;

const HelpCon = styled.div`
  color: #333;
  text-align: left;
  font-size: 1.4rem;
  font-weight: bold;

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

const SocialCon = styled.div`
  display: flex;
`;
const Google = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 15rem;
  background: #fefefe;
  border: none;
  border-radius: 1rem;
  padding: 1rem 0.25rem;
  margin-right: 1rem;
  text-align: left;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    ${shadow(1)}
  }
  &:active {
    ${shadow(2)}
  }
  svg {
    width: 2rem;
    margin: 0 0.5rem;
    font-size: 2rem;
    color: red;
  }
`;
const FaceBook = styled(Google)`
  margin-right: 0;
  &:active {
  }
  svg {
    color: blue;
  }
`;

const GoogleText = styled.span`
  flex: 1;
  padding-left: 1.5rem;
  font-weight: bold;
`;
const FacebookText = styled(GoogleText)`
  padding-left: 0.5rem;
`;
