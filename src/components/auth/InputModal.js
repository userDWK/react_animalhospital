import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";
import { authService } from "../../fbase";
import AuthInput from "./AuthInput";

const InputModal = ({
  email,
  setEmail,
  setIsModal,
  handleData,
  nick,
  setNick,
  phone,
  setPhone,
  modifyProps,
  handleInfo,
  updateUserInfo,
  ...rest
}) => {
  const location = useLocation().pathname.slice(1);

  const sendResetEmail = async (e) => {
    e.preventDefault();
    try {
      await authService.sendPasswordResetEmail(email);
    } catch (e) {
      console.error(e);
    }
    setEmail("");
    setIsModal(false);
  };

  return (
    <>
      <ModalCon>
        <ModalBox>
          {location === "login" ? (
            <>
              <AuthInput
                htmlFor="email"
                text="이메일을 입력 하세요."
                type="text"
                name="email"
                placeholder="Enter your email..."
                minLength="0"
                maxLength="100"
                onChange={handleData}
              />
              <BtnBox>
                <SubmitBtn onClick={sendResetEmail}>이메일 전송</SubmitBtn>
                <CancelBtn onClick={rest.onClick}>닫기</CancelBtn>
              </BtnBox>
            </>
          ) : (
            <>
              <Form onSubmit={updateUserInfo}>
                {modifyProps.map((data, idx) => {
                  const value = [nick, phone];
                  return (
                    <AuthInput
                      key={data.name}
                      {...data}
                      onChange={handleInfo}
                      value={value[idx]}
                    />
                  );
                })}
                <BtnBox>
                  <SubmitBtn>변경하기</SubmitBtn>
                  <CancelBtn type="button" onClick={rest.onClick}>
                    닫기
                  </CancelBtn>
                </BtnBox>
              </Form>
            </>
          )}
        </ModalBox>
      </ModalCon>
    </>
  );
};

export default InputModal;

const ModalCon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  padding: 0 0 7rem;
  background: ${theme("lightgray")};

  ${media.xs`
  top : 30%;
  width : 80%;
  min-height : 30rem;
  max-height : 50rem;
  `}
`;

const BtnBox = styled.div`
  position: absolute;
  bottom: 2.5rem;
  right: 2rem;
  display: flex;

  ${media.xs`
  bottom : 3.5rem;
  right : 3.5rem;
  `}
`;
const SubmitBtn = styled.button`
  margin-right: 1rem;
  padding: 1rem 1.25rem;
  background: ${theme("gray")};
  border: none;
  border-radius: 0.3rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background: ${theme("sky")};
    font-weight: 600;
  }
  &:active {
    box-shadow: 0.2rem 0.2rem 0.2rem gray;
  }

  ${media.xs`
  margin-right : 2rem;
  font-size : 2.5rem;
  `}
`;

const CancelBtn = styled(SubmitBtn)`
  margin-right: 0;
  &:hover {
    background: ${theme("red")};
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  ${media.xs`
  `}
`;
