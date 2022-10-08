import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../fbase";
import AuthInput from "./AuthInput";

const FindModal = ({
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
  changeData,
  ...rest
}) => {
  const location = useLocation().pathname.slice(1);

  const sendEmail = async (e) => {
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
                <SubmitBtn onClick={sendEmail}>이메일 전송</SubmitBtn>
                <CancelBtn onClick={rest.onClick}>닫기</CancelBtn>
              </BtnBox>
            </>
          ) : (
            <>
              <Form onSubmit={changeData}>
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

export default FindModal;

const ModalCon = styled.div`
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 300%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  padding: 0 0 7rem;
  background: #eee;
`;

const BtnBox = styled.div`
  position: absolute;
  bottom: 2.5rem;
  right: 2rem;
  display: flex;
`;
const SubmitBtn = styled.button`
  margin-right: 1rem;
  padding: 1rem 1.25rem;
  background: #aaa;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover {
    background: rgb(120, 200, 250);
    font-weight: 600;
  }
  &:active {
    box-shadow: 2px 2px 2px gray;
  }
`;

const CancelBtn = styled(SubmitBtn)`
  margin-right: 0;
`;

const Form = styled.form``;
