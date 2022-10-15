import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";
import basicProfile from "../../sources/images/app.jpg";

const ViewHospital = () => {
  const [hospital, setHospital] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const mapRef = useRef();

  const RequestNaverMapApi = useCallback((naver, hospital) => {
    const location = new naver.maps.LatLng(hospital.lat, hospital.lon);
    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: true,
      zoomControlObtions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  const getSelectItemFromSession = useCallback(() => {
    if (!hospital) {
      setHospital(JSON.parse(sessionStorage.getItem("SELECT_HOSPITAL")));
    }
  }, [hospital]);

  const expandImg = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  const addDataToStorage = (e) => {
    console.log(e);
    // e.stopPropagation();
    localStorage.setItem("INTEREST_HOSPITAL", JSON.stringify(hospital));
  };

  useEffect(() => {
    const { naver } = window;
    getSelectItemFromSession();
    hospital && RequestNaverMapApi(naver, hospital);
  }, [RequestNaverMapApi, getSelectItemFromSession, hospital]);

  return (
    <Container>
      {isModal && (
        <ImgModalCon>
          <ImgModalBox>
            <HospitalImg src={hospital.thumUrl || basicProfile} alt="" />
            <ModalCloseBtn onClick={() => setIsModal(false)}>X</ModalCloseBtn>
          </ImgModalBox>
        </ImgModalCon>
      )}

      {hospital && (
        <Row>
          <LeftBox>
            <FontAwesomeIcon icon={faHeart} onClick={addDataToStorage} />
            <ImgBox onClick={expandImg}>
              <Img src={hospital.thumUrl || basicProfile} alt="" />
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
              <BizHourInfo>
                <span>영업 시간 : </span>
                {hospital.bizhourInfo}
              </BizHourInfo>
            </TextBox>
          </LeftBox>
          <RightBox>
            <LocationBox ref={mapRef}></LocationBox>
          </RightBox>
        </Row>
      )}
    </Container>
  );
};

export default ViewHospital;

const Container = styled.div``;

const ImgModalCon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2;
`;
const ImgModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 55%;
  background: ${theme("white")};
`;
const HospitalImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: -10rem;
  right: -5rem;
  width: 5rem;
  height: 4rem;
  border: none;
  color: white;
  font-size: 3rem;
  padding: 3rem;
  font-weight: bolder;
  background: transparent;
  cursor: pointer;
`;

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
  position: relative;
  width: 55%;
  margin: 0 auto 0 6rem;
  border-right: solid 1px ${theme("gray")};

  svg {
    position: absolute;
    right: 10%;
    font-size: 4rem;
    color: pink;
    cursor: pointer;
    &:hover {
      color: ${theme("red")};
    }
  }

  ${media.xxs`
  svg {
    font-size : 3rem;
    right : 5%;
  }
  `}
`;

const ImgBox = styled.div`
  width: 100%;
  cursor: pointer;
`;

const Img = styled.img`
  width: 90%;
  border-radius: 19rem;
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
  font-size: 1.9rem;
`;
const Tel = styled.p`
  font-size: 1.75rem;
`;
const BizHourInfo = styled.p`
  font-size: 1.75rem;
`;

const RightBox = styled.div`
  width: 45%;
  margin: 0 7rem;
  z-index: 1;
`;

const LocationBox = styled.div`
  width: 100%;
  height: 50rem;
  padding: 2rem;
`;
