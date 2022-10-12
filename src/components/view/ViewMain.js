import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";
import Masonry from "react-masonry-component";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dbService } from "../../fbase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import basicProfile from "../../sources/images/app.jpg";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux";
import { setSelect } from "../../redux/feature/storageSlice";

const region = [
  "해운대구",
  "수영구",
  "동래구",
  "연제구",
  "남구",
  "금정구",
  "북구",
  "서구",
  "강서구",
  "동구",
  "부산진구",
  "기장군",
  "사상구",
  "사하구",
  "중구",
  "영도구",
];

const View = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectHospital, setSelectHospital] = useState({});
  const location = useLocation().pathname.slice(6);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const masonryOptions = {
    itemSelector: ".gridItem",
  };

  //location에 해당하는 병원 정보 요청하여 setState.
  const getDisplayData = useCallback(async () => {
    let data = [];
    if (location) {
      const docRef = doc(dbService, "hospitals", location);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        Object.keys(docSnap.data()).forEach((key) => {
          data = [...data, ...docSnap.data()[key]];
        });
      } else {
        data = [];
      }
    } else {
      const querySnapshot = await getDocs(collection(dbService, "hospitals"));
      querySnapshot.forEach((doc) => {
        Object.keys(doc.data()).forEach((key) => {
          data = [...data, ...doc.data()[key]];
        });
      });
    }
    setHospitals(data);
  }, [location]);

  const getSelectHospitalInfo = (e) => {
    e.preventDefault();
    hospitals.forEach((hospital) => {
      if (hospital.tel === e.currentTarget.id) {
        dispatch(setSelect(hospital));
        navigate(`hospital?query=${hospital.animal_hospital}`);
      }
    });
  };
  console.log(1);
  useEffect(() => {
    getDisplayData();
  }, [location, getDisplayData]);
  return (
    <Container className="main">
      <Row>
        <RegionBox className="region">
          <Region>
            <Link to="">전체</Link>
          </Region>
          {region.sort().map((gu) => {
            return (
              <Region key={gu}>
                <Link to={`${gu}`}>{gu}</Link>
              </Region>
            );
          })}
        </RegionBox>
        <MasonryBox>
          <Masonry
            className={"masonry"} // default ''
            elementType={"ul"} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            // imagesLoadedOptions={imagesLoadedOptions} // default {}
          >
            {hospitals.map((hospital) => {
              return (
                <Item
                  key={hospital.tel}
                  id={hospital.tel}
                  className="gridItem"
                  onClick={getSelectHospitalInfo}
                >
                  <ImgBox>
                    <ThumImg
                      src={hospital.thumUrl ? hospital.thumUrl : basicProfile}
                      alt=""
                    />
                  </ImgBox>
                  <TextBox>
                    <HospitalName>{hospital.animal_hospital}</HospitalName>
                    <HospitalAdd>{hospital.road_address}</HospitalAdd>
                  </TextBox>
                </Item>
              );
            })}
          </Masonry>
        </MasonryBox>
      </Row>
    </Container>
  );
};

export default View;

const Container = styled.div`
  padding-top: 15rem;
  text-align: center;
  font-family: "Cormorant", serif;
  font-size: 2rem;
  background: ${theme("beige")};
  max-height: 100%;
`;

const Row = styled.div`
  position: relative;
  width: 120rem;
  margin: 0 auto;
  display: flex;

  &::before {
    position: absolute;
    content: "";
    top: -7rem;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background: ${theme("gray")};
  }

  ${media.lg`
  width : 100%;
  `}
`;

const MasonryBox = styled.div`
  width: 100%;
`;

const RegionBox = styled.div`
  position: sticky;
  top: 10%;
  margin-left: 2rem;
  width: 30rem;
  height: 100%;
  padding: 1rem 0;
  transition: all 0.5s;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;

const Region = styled.div`
  position: relative;
  font-size: 2rem;

  &::after {
    content: "";
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    display: block;
    width: 50%;
    height: 1px;
    background: linear-gradient(
      to left,
      transparent,
      ${theme("darkbeige")},
      transparent
    );
  }

  &:last-child {
    &::after {
      display: none;
    }
  }

  a {
    &:hover {
      font-weight: 600;
      border-bottom: solid 1px ${theme("green")};
    }
    &:active {
      text-shadow: 0.55px 0.75px 0.95px ${theme("green")};
    }
  }
`;

const Item = styled.li`
  width: 30%;
  padding: 0 0 2rem 2rem;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    margin: 0 0 2rem 2rem;
    padding: 0;
    background: lightcyan;
    border: solid 1px ${theme("gray")};
  }

  ${media.md`
  width : 45%;
  `}
`;

const ImgBox = styled.div``;
const ThumImg = styled.img`
  width: 100%;
  border-radius: 1rem;
`;
const TextBox = styled.div`
  margin-top: 0.75rem;
`;
const HospitalName = styled.h5`
  font-size: 2.25rem;
  font-weight: bold;
`;
const HospitalAdd = styled.p`
  padding-top: 1rem;
  font-size: 2rem;
`;
