import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import MainImg from "../sources/images/main.jpg";
import { media, theme } from "../assets/style/styleUtil";

const Main = () => {
  return (
    <>
      <Container>
        {/* <Background /> */}
        <Row>
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
          <ImgCon>
            <Img src={MainImg} />
          </ImgCon>
        </Row>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.main`
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  overflow: hidden;
  position: relative;
=======
  /* overflow-x: hidden; */
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
  /* overflow-x: hidden; */
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
  /* overflow-x: hidden; */
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
  background: ${theme("beige")};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 120rem;
  margin: 0 auto;
  padding: 15rem 0;

  ${media.xs`
  flex-direction : column;
  `}

  ${media.xl`
  width : 100%;
  margin : 0;
  `}
`;

const TextCon = styled.div`
  position: relative;
  width: 42%;
  text-align: left;
  padding-left: 5rem;
  color: ${theme("darkgreen")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 11%;
    width: 100%;
    margin: 0;
    height: 1px;
    background: ${theme("grayGradient")};
    display: block;
  }

  ${media.xs`
  width : 100%;
  margin : 0;
  padding : 0 10%;
  &::before {
    width : 80%;
  }
  `}
`;
const Title = styled.h2`
  margin-top: 10%;
  font-size: 4.8rem;
  font-weight: 600;

  ${media.xl`
  font-size : 4.8rem;
  `}
  ${media.md`
  font-size : 4.5rem;
  `}
`;
const Desc = styled.p`
  margin-top: 4rem;
  font-size: 2.25rem;
`;
const Search = styled.button`
  position: absolute;
  bottom: -40%;
  right: 0;
  background: transparent;
  padding: 2rem 5rem;
  border: 0;
  border-bottom: double 0.1rem ${theme("gray")};
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

const ImgCon = styled.div`
  flex: 1;
  text-align: right;
  ${media.xs`
  width : 100%;
  margin : 0;
  margin-top : 10%;
  padding : 0 10%;
  `}
`;
const Img = styled.img`
  width: 80%;
  height: 43rem;
  border-top-left-radius: 30%;
  border-bottom-left-radius: 10%;
`;
