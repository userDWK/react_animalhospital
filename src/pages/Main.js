import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import MainImg from "../sources/images/main.jpg";
import { media } from "../style/styleUtil";

const Main = () => {
  return (
    <>
      <Container>
        <Background />
        <Row>
          <ImgCon>
            <Img src={MainImg} />
          </ImgCon>
          <TextCon>
            <Title>동물들의 골든타임을 지켜주세요.</Title>
            <Desc>
              가족과 같은 동물을 지켜주는 것은
              <br />
              보호자의 신속하고 정확한 판단입니다.
            </Desc>
            <Search>
              병원 찾기
              <FontAwesomeIcon icon={faArrowRight} />
            </Search>
          </TextCon>
        </Row>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.main`
  position: relative;
  width: 120rem;
  margin: 10rem auto;

  ${media.xl`
  width : 100%;
  `}
`;
const Background = styled.div`
  box-sizing: content-box;
  position: absolute;
  top: -5rem;
  width: 100%;
  height: 100%;
  padding: 5rem 0;
  background: linear-gradient(to right, gray, beige);
  opacity: 0.2;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ImgCon = styled.div`
  width: 50%;
  margin: 0 4%;

  ${media.xs`
  width : 100%;
  padding : 0 10%;
  `}
`;
const Img = styled.img`
  width: 100%;
`;

const TextCon = styled.div`
  position: relative;
  width: 42%;
  text-align: center;
  padding-right: 5rem;

  ${media.xs`
  width : 100%;
  padding : 0 10%;
  `}
`;
const Title = styled.h2`
  margin-top: 10%;
  font-size: 2.75rem;
  font-weight: 600;

  ${media.xl`
  font-size : 2.15rem;
  `}
`;
const Desc = styled.p`
  margin-top: 6rem;
  font-size: 1.9rem;
`;
const Search = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 13rem;
  background: transparent;
  padding: 2rem 5rem;
  border: 0;
  border-bottom: double 1px lightgray;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  svg {
    margin-left: 2rem;
  }

  ${media.xs`
  position : relative;
  bottom : -10%;
  left : 0;
  text-align : center;
  `}
`;
