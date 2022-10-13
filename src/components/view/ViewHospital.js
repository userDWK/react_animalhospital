import { useSelector } from "react-redux";
import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";

const ViewHospital = () => {
  const hospital = useSelector((state) => state.selectData.select);
  return (
    <Container>
      <Row>
        <LeftBox>
          <ImgBox>
            <Img src={hospital.thumUrl} />
          </ImgBox>
          <TextBox>
            <Title>
              <span>{hospital.animal_hospital}</span>
            </Title>
            <Address>
              <span>주소 : </span>
              {hospital.road_address}
            </Address>
            <Tel>
              <span>대표 번호 : </span>
              {hospital.tel}
            </Tel>
          </TextBox>
        </LeftBox>
        <RightBox>
          <LocationBox>123</LocationBox>
        </RightBox>
      </Row>
    </Container>
  );
};

export default ViewHospital;

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 120rem;
  min-height: 100rem;
  margin: 0 auto;

  ${media.xl`
  width : 100%;
  margin : 0;
  `}
`;

const LeftBox = styled.div`
  padding: auto 0;
  width: 45%;
  text-align: center;
  border-right: solid 1px ${theme("gray")};
`;

const ImgBox = styled.div``;

const Img = styled.img`
  padding: 0 2rem;
  width: 100%;
  border-radius: 19rem;
  cursor: pointer;
`;

const TextBox = styled.div`
  flex: 1;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  padding: 2rem 0;
  cursor: pointer;

  &:hover {
    color: ${theme("green")};

    span {
      border-bottom: solid 1px ${theme("green")};
    }
  }

  &:active {
    text-shadow: 0.5px 0.75px 0.9px ${theme("darkgreen")};
    span {
      border-bottom-width: 2px;
    }
  }
`;
const Address = styled.p`
  font-size: 1.75rem;
`;
const Tel = styled.p`
  font-size: 1.5rem;
`;

const RightBox = styled.div``;

const LocationBox = styled.div`
  width: 40rem;
  height: 30rem;
`;
