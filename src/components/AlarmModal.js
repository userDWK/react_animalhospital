import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media, shadow, theme } from "../assets/style/styleUtil";

const AlarmModal = ({ setIsModal, ...rest }) => {
  const message = useSelector((state) => state.messageData.message);
  const navigate = useNavigate();
  const movePage = (e) => {
    navigate(message.href);
    setIsModal(false);
  };
  return (
    <>
      <ModalCon>
        <ModalBox>
          <TextBox>
            <Text>
              <Type>{message.type}</Type>
              {` :   ${message.text}`}
            </Text>
          </TextBox>
          <BtnBox>
            <MoveBtn onClick={movePage}>{message.moveText}</MoveBtn>
            <CloseBtn
              onClick={() => {
                setIsModal(false);
              }}
            >
              닫기
            </CloseBtn>
          </BtnBox>
        </ModalBox>
      </ModalCon>
    </>
  );
};

export default AlarmModal;

const ModalCon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 45rem;
  min-height: 15rem;
  padding: 0 0 10rem;
  background: #eee;
  border-radius: 1rem;

  ${media.xs`
  width : 60rem;
  `}
`;
const TextBox = styled.div`
  margin: 3rem;
`;
const Text = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;
const Type = styled.span`
  color: ${theme("red")};
`;
const BtnBox = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 1rem;
`;
const MoveBtn = styled.button`
  background: ${theme("gray")};
  border: 0;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;

  &:hover {
    background: ${theme("sky")};
    cursor: pointer;
    ${shadow(0)}
  }
  &:active {
    ${shadow(2)}
  }
`;
const CloseBtn = styled(MoveBtn)`
  &:hover {
    background: ${theme("red")};
  }
`;
