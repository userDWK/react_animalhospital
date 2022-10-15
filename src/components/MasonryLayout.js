import Masonry from "react-masonry-component";
import basicProfile from "../sources/images/app.jpg";
import styled from "styled-components";
import { media, theme } from "../assets/style/styleUtil";
import { useNavigate } from "react-router-dom";

const MasonryLayout = ({ displayItems, hospitals }) => {
  const navigate = useNavigate();

  const masonryOptions = {
    itemSelector: ".gridItem",
  };

  const getSelectHospitalInfo = (e) => {
    e.preventDefault();
    const [district, area, tel] = e.currentTarget.id.split("_");

    const hospital = hospitals[district][area].filter((hos) => {
      return hos.tel === tel;
    });
    sessionStorage.setItem("SELECT_HOSPITAL", JSON.stringify(hospital[0]));
    navigate(`/view/hospital?${hospital[0].animal_hospital}`);
  };
  return (
    <MasonryBox>
      <Masonry
        className={"masonry"} // default ''
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        // imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {Object.values(displayItems)?.map((area) => {
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
          });
        })}
      </Masonry>
    </MasonryBox>
  );
};

export default MasonryLayout;

const MasonryBox = styled.div`
  width: 100%;
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
