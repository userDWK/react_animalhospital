import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { media, shadow } from "../assets/style/styleUtil";
import FindModal from "../components/auth/InputModal";
import { dbService } from "../fbase";

const modifyProps = [
  {
    htmlFor: "nick",
    text: "변경할 닉네임을 입력 하세요.",
    type: "text",
    name: "nick",
    placeholder: "Enter your nickName...",
    minLength: "0",
    maxLength: "100",
  },
  {
    htmlFor: "phone",
    text: "변경할 휴대폰 번호를 입력 하세요.",
    type: "number",
    name: "phone",
    placeholder: "Enter your phone number...",
    minLength: "10",
    maxLength: "15",
  },
];

const Profile = () => {
  const user = useSelector((state) => {
    return state.userData.info;
  });
  const interest = useSelector((state) => {
    return state.interestData.Hospitals;
  });

  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [isModal, setIsModal] = useState(false);
  const displayUser = [email, nick, phone];

  const handleInfo = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "nick") {
      setNick(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  const changeData = async (e) => {
    e.preventDefault();
    try {
      await dbService.collection("users").doc(user.uid).update({
        phone,
        nick,
      });
      setIsModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setNick(user.nick);
      setPhone(user.phone);
    }
  }, [user]);

  return (
    <Container>
      {isModal && nick && phone && (
        <FindModal
          onClick={() => setIsModal(false)}
          handleInfo={handleInfo}
          changeData={changeData}
          setIsModal={setIsModal}
          modifyProps={modifyProps}
          nick={nick}
          setNick={setNick}
          phone={phone}
          setPhone={setPhone}
        />
      )}
      <Row>
        <Left>
          <Title>Modify Information</Title>
          {displayUser.map((data, idx) => {
            const text = ["email", "nick", "phone"];
            return (
              <InfoBox key={text[idx]}>
                <Text>{`${text[idx]} : `}</Text>
                <Info>{data}</Info>
              </InfoBox>
            );
          })}
          <ModifyBtn
            onClick={() => {
              setIsModal(true);
            }}
          >
            on modify
          </ModifyBtn>
        </Left>
        <Right>
          <Title>hospitals of interest</Title>
          {interest &&
            interest.map((hospital, idx) => {
              return (
                <HospitalBox key={hospital + idx}>
                  <TextBox>
                    <Hospital></Hospital>
                    <Address></Address>
                  </TextBox>
                </HospitalBox>
              );
            })}
        </Right>
      </Row>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  position: relative;
  min-height: 80rem;
  text-align: center;
  font-family: "Cormorant", serif;
  font-size: 2rem;
  background: ghostwhite;
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 120rem;
  margin: 0 auto;

  ${media.xs`
  flex-direction : column;
  `}

  ${media.xl`
  width : 100%; 
  margin : 0;
  `}
`;

const Left = styled.div`
  max-width: 35%;
  padding: 5rem;

  ${media.xs`
  max-width : 70%;
  margin : 0 auto;
  `}
`;
const Title = styled.h1`
  position: relative;
  font-size: 2.5rem;
  padding: 2rem 0;
  color: gray;
  border-bottom: solid 0.2rem lavender;
`;
const InfoBox = styled.div`
  padding: 2rem 0;
  border-bottom: solid 0.1rem lavender;
`;
const Text = styled.h3`
  color: rgba(120, 80, 120);
  font-size: 2rem;
`;
const Info = styled.p`
  margin-top: 1rem;
  font-size: 1.75rem;
  letter-spacing: 0.08rem;
`;
const ModifyBtn = styled.button`
  border: none;
  background: gainsboro;
  margin-top: 1rem;
  padding: 1.25rem 4rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;

  &:hover {
    ${shadow(0)}
    color: rgb(21, 177, 125);
  }
  &:active {
    ${shadow(2)}
  }
`;

const Right = styled.div`
  position: relative;
  flex: 1;
  padding: 5rem;

  &::before {
    content: "";
    position: absolute;
    top: 5%;
    left: 0;
    width: 0.1rem;
    height: 100%;
    display: block;
    background: linear-gradient(
      to top,
      rgb(245, 245, 245),
      lightgray,
      rgb(245, 245, 245)
    );
  }
`;

const HospitalBox = styled.div``;
const TextBox = styled.div``;
const Hospital = styled.h5``;
const Address = styled.p``;
