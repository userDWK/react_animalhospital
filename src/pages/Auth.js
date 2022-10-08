import { useState } from "react";
import styled from "styled-components";
import AuthInput from "../components/auth/AuthInput";
import { media, shadow } from "../assets/style/styleUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import FindModal from "../components/auth/InputModal";
import firebase from "firebase/compat/app";
import { getDoc } from "firebase/firestore";

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
  const [isModal, setIsModal] = useState(false);

  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

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
    e.preventDefault();

    try {
      if (location === "login") {
        await authService.signInWithEmailAndPassword(email, password);
      } else if (location === "create") {
        if (password !== checkPassword) return;
        const data = {
          email,
          password,
          nick,
          phone,
        };
        await authService.createUserWithEmailAndPassword(email, password);

        const uid = authService.currentUser.uid;
        await dbService
          .collection("users")
          .doc(uid)
          .set({
            ...data,
            uid: uid,
          });
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    setEmail("");
    setPassword("");
    setCheckPassword("");
    setNick("");
    setPhone("");
  };

  const socialLogin = async (e) => {
    e.preventDefault();
    try {
      let user = {};
      if (e.target.closest("#google")) {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        await authService.signInWithPopup(provider).then((result) => {
          user = result.user;
        });
        const docRef = dbService.collection("users").doc(user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.data()) {
          await dbService.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            nick: user.displayName,
            phone: user.phoneNumber,
          });
        }
      } else if (e.target.closest("#github")) {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("refo");

        await authService.signInWithPopup(provider).then((result) => {
          user = result.user;
          console.log(user);
        });
        const docRef = dbService.collection("users").doc(user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.data()) {
          await dbService.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            nick: user.displayName,
            phone: user.phoneNumber,
          });
        }
      }
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      {isModal && (
        <FindModal
          onClick={() => setIsModal(false)}
          email={email}
          setEmail={setEmail}
          handleData={handleData}
          setIsModal={setIsModal}
        />
      )}
      <Column>
        <Title>{location === "login" ? "Sign In" : "Create Account"}</Title>
        <Form onSubmit={handleForm}>
          {(location === "login" ? loginProps : createProps).map(
            (props, idx) => {
              // const value = [email, password];
              const value = [email, password, checkPassword, nick, phone];
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModal(true);
                  }}
                >
                  <a href="/find">계정 찾기</a>
                </button>
              </SearchCon>
            </HelpCon>
            <SocialCon>
              <Google id="google" onClick={socialLogin}>
                <FontAwesomeIcon icon={faGoogle} />
                <GoogleText>Google Login</GoogleText>
              </Google>
              <GitHub id="github" onClick={socialLogin}>
                <FontAwesomeIcon icon={faGithub} />
                <GithubText>Github Login</GithubText>
              </GitHub>
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
  border: solid 0.2rem lightgray;
  border-radius: 0.5rem;
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
  border-top: solid 0.1rem #999;
`;

const HelpCon = styled.div`
  color: #333;
  text-align: left;
  font-size: 1.4rem;
  font-weight: bold;

  a {
    &:hover {
      border-bottom: solid 0.1rem cadetblue;
      font-weight: bold;
    }
    &:active {
      text-shadow: 0 0 0.1rem rgb(21, 177, 125);
    }
  }
`;
const CreateCon = styled.div`
  margin-bottom: 0.5rem;
`;
const SearchCon = styled.div`
  button {
    background: transparent;
    border: none;
    color: #333;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;

    button {
      &:hover {
        border-bottom: solid 0.1rem cadetblue;
        font-weight: bold;
      }
      &:active {
        text-shadow: 0 0 0.1rem rgb(21, 177, 125);
      }
    }
  }
`;

const SocialCon = styled.div`
  display: flex;

  ${media.xs`
  flex-direction : column;
  `}
`;
const Google = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fefefe;
  border: none;
  border-radius: 1rem;
  margin-right: 1rem;
  padding: 1rem 1.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    ${shadow(1)}
  }
  &:active {
    ${shadow(2)}
  }
  svg {
    margin: 0 0.5rem;
    font-size: 2rem;
    color: red;
  }

  ${media.xs`
  margin : 0.5rem 0;
  `}
`;
const GitHub = styled(Google)`
  margin-right: 0;
  &:active {
  }
  svg {
    color: blue;
  }
`;

const GoogleText = styled.span`
  flex: 1;
  margin: 0 auto;
  font-weight: bold;
`;
const GithubText = styled(GoogleText)``;
