import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";
import Masonry from "react-masonry-component";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import basicProfile from "../../sources/images/app.jpg";
import { useNavigate } from "react-router-dom/dist";

const district = [
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

const View = ({ hospitals }) => {
  const [displayData, setDisplayData] = useState({});
  const location = useLocation().pathname.slice(6);
  const queryLocation = useLocation().search.slice(1);
  const navigate = useNavigate();

  const masonryOptions = {
    itemSelector: ".gridItem",
  };

  const activeStyle = { color: `${theme("green")}`, fontWeight: "bolder" };

  const getSearchData = useCallback(() => {
    if (!hospitals) return;
    const text = queryLocation.slice(6);

    let hos = null;
    Object.keys(hospitals).forEach((district) => {
      if (district.indexOf(text) !== -1) {
        Object.values(hospitals[district]).forEach((area) => {
          hos = hos
            ? {
                [text]: [...Object.values(hos[text]), ...Object.values(area)],
              }
            : {
                [text]: [...Object.values(area)],
              };
        });
      } else {
        Object.keys(hospitals[district]).forEach((area) => {
          if (area.indexOf(text) !== -1) {
            hos = hos
              ? {
                  [text]: [
                    ...Object.values(hos[text]),
                    ...Object.values(hospitals[district][area]),
                  ],
                }
              : {
                  [text]: [...Object.values(hospitals[district][area])],
                };
          } else {
            hospitals[district][area].forEach((item) => {
              if (Object.values(item).join("_").indexOf(text) !== -1) {
                hos = hos
                  ? {
                      [text]: [...Object.values(hos[text]), item],
                    }
                  : {
                      [text]: [item],
                    };
              }
            });
          }
        });
      }
    });
    setDisplayData(hos);
  }, [hospitals, queryLocation]);

  //props로 전달받은 hospitals에서
  const getDisplayData = useCallback(() => {
    if (!hospitals) return;
    let data = {};
    if (location) {
      data = hospitals[location];
    } else {
      Object.values(hospitals).forEach((area) => {
        Object.values(area).forEach((hospital) => {
          if (data[hospital[0].area]) {
            data = {
              ...data,
              [data[hospital[0].area]]: {
                ...data[(hospital[0].area, hospital)],
              },
            };
          } else {
            data = { ...data, [hospital[0].area]: hospital };
          }
        });
      });
    }
    setDisplayData(data);
  }, [location, hospitals]);

  const getSelectHospitalInfo = (e) => {
    e.preventDefault();

    const [district, area, tel] = e.currentTarget.id.split("_");

    const hospital = hospitals[district][area].filter((hos) => {
      return hos.tel === tel;
    });
    sessionStorage.setItem("SELECT_HOSPITAL", JSON.stringify(hospital[0]));
    navigate(`hospital?${hospital[0].animal_hospital}`);
  };

  useEffect(() => {
    queryLocation.startsWith("query") ? getSearchData() : getDisplayData();
  }, [location, queryLocation, getDisplayData, getSearchData]);

  return (
    <Container className="main">
      <Row>
        <DistrictBox className="district">
          <District>
            <NavLink to="" style={location ? undefined : activeStyle}>
              전체
            </NavLink>
          </District>
          {district.sort().map((gu) => {
            return (
              <District key={gu}>
                <NavLink
                  to={`${gu}`}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {gu}
                </NavLink>
              </District>
            );
          })}
        </DistrictBox>
        {displayData ? (
          <MasonryBox>
            <Masonry
              className={"masonry"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              // imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              {Object.values(displayData)?.map((area) => {
                return area.map((hospital) => {
                  return (
                    <Item
                      key={hospital.tel}
                      id={`${hospital.gugun}_${hospital.area}_${hospital.tel}`}
                      className="gridItem"
                      onClick={getSelectHospitalInfo}
                    >
                      <ImgBox>
                        <ThumImg
                          src={
                            hospital.thumUrl ? hospital.thumUrl : basicProfile
                          }
                          alt=""
                        />
                      </ImgBox>
                      <TextBox>
                        <HospitalName>{hospital.animal_hospital}</HospitalName>
                        <HospitalAdd>{hospital.road_address}</HospitalAdd>
                      </TextBox>
                    </Item>
                  );
                });
              })}
            </Masonry>
          </MasonryBox>
        ) : (
          <EmptyDataBox>
            <EmptyText>Not exist search data.</EmptyText>
          </EmptyDataBox>
        )}
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

const DistrictBox = styled.div`
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

const District = styled.div`
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
  width: 29%;
  padding: 1rem;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
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

const EmptyDataBox = styled.div`
  position: relative;
  left: 0;
  margin: auto;
`;
const EmptyText = styled.h2`
  font-size: 5rem;
  font-family: "Roboto", sans-serif;
  color: ${theme("darkgreen")};
`;
