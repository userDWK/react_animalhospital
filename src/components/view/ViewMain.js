import styled from "styled-components";
import { media, theme } from "../../assets/style/styleUtil";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MasonryLayout from "../MasonryLayout";

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
  const [displayItems, setDisplayItems] = useState({});
  const location = useLocation().pathname.slice(6);
  const queryLocation = useLocation().search.slice(1);

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
    setDisplayItems(hos);
  }, [hospitals, queryLocation]);

  //props로 전달받은 hospitals에서
  const getdisplayItems = useCallback(() => {
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
    setDisplayItems(data);
  }, [location, hospitals]);

  // const getSelectHospitalInfo = (e) => {
  //   e.preventDefault();

  //   const [district, area, tel] = e.currentTarget.id.split("_");

  //   const hospital = hospitals[district][area].filter((hos) => {
  //     return hos.tel === tel;
  //   });
  //   sessionStorage.setItem("SELECT_HOSPITAL", JSON.stringify(hospital[0]));
  //   navigate(`hospital?${hospital[0].animal_hospital}`);
  // };

  useEffect(() => {
    queryLocation.startsWith("query") ? getSearchData() : getdisplayItems();
  }, [location, queryLocation, getdisplayItems, getSearchData]);

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
        {displayItems ? (
          <MasonryLayout displayItems={displayItems} hospitals={hospitals} />
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
