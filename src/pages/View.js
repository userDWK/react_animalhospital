import styled, { css } from "styled-components";
import { media, shadow, theme } from "../assets/style/styleUtil";
import Masonry from "react-masonry-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [scrollY, setScrollY] = useState(0);
  const masonryOptions = {
    itemSelector: ".gridItem",
  };

  const followScroll = () => {
    const interval = setInterval(() => {
      try {
        setScrollY(window.scrollY);
        const region = document.querySelector(".region");
        if (window.scrollY) {
          region.style.left = "-50%";
          region.style.opacity = 0;
          region.style.width = 0;
        } else {
          region.style.left = 0;
          region.style.opacity = 1;
          region.style.width = "25%";
        }
      } catch (e) {
        clearInterval(interval);
      }
    }, 1 * 1000);
  };

  useEffect(() => {
    // followScroll();
  }, []);
  return (
    <Container>
      <Row>
        <RegionBox className="region" scrollY={scrollY}>
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
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://www.hwasun.go.kr/culture/new/images/hwasun801_01.jpg"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRasieESJNiRFefqktJL4qkTQhbeLt-nrJQ&usqp=CAU"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://w7.pngwing.com/pngs/402/653/png-transparent-ball-pocket-pocket-monster-poke-poke-ball-set-icon-thumbnail.png"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6gBc7B6Wfhcl58kElznvZItemDXrntcKIHXcw&usqp=CAU"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://t1.daumcdn.net/tistoryfile/fs11/33_tistory_2009_02_26_22_41_49a69bf854e7c?x-content-disposition=inItemne"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://t1.daumcdn.net/tistoryfile/fs15/20_tistory_2009_02_26_22_41_49a69c16abda8?x-content-disposition=inItemne"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://t1.daumcdn.net/tistoryfile/fs15/21_tistory_2009_02_26_22_41_49a69c15c5017?x-content-disposition=inItemne"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
            <Item className="gridItem" scrollY={scrollY}>
              <img
                src="https://t1.daumcdn.net/tistoryfile/fs15/21_tistory_2009_02_26_22_41_49a69c15c5017?x-content-disposition=inItemne"
                alt=""
              />
              <h1>메롱</h1>
              <p>야호</p>
            </Item>
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
`;

const Row = styled.div`
  position: relative;
  width: 120rem;
  margin: 0 auto;

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

  ${media.xl`
  width : 100%;
  `}
`;

const MasonryBox = styled.div`
  width: 70%;
  margin-left: auto;

  /* ${media.xxs`
  width : 60%;
  `} */

  ${media.md`
  width : 61%;
  `}
`;

const RegionBox = styled.div`
  position: fixed;
  top: 27rem;
  margin-left: 2rem;
  width: 30rem;
  padding: 1rem 0;
  border: solid 1px ${theme("gray")};
  transition: all 0.5s;

  ${media.xs`
  top : 35rem;
  `}
`;

const Region = styled.div`
  position: relative;
  margin: 1rem auto;
  width: 80%;
  font-size: 2.5rem;

  &::after {
    content: "";
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    display: block;
    width: 80%;
    height: 2px;
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
  img {
    width: 100%;
  }

  ${media.lg`
  width : 45%;
  `}
`;
