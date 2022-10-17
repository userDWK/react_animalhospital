import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { media, shadow, theme } from "../assets/style/styleUtil";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../fbase";
import AlarmModal from "./AlarmModal";
import { setMessage } from "../redux/feature/messageSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const item = [
  { label: "", className: "line" },
  { label: "profile", className: "list", id: "profile", href: "/profile" },
  { label: "view", className: "list", href: "/view" },
  { label: "login", className: "list", id: "login", href: "/login" },
];

const Header = ({ interestCnt }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [text, setText] = useState("");
  const [isModal, setIsModal] = useState(false);
  const loggedIn = useSelector((state) => state.userData.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHover = (e) => {
    setIsSearch((prev) => !prev);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    navigate(`/view?query=${text}`);
    setText("");
  };

  const handleLogout = async (e) => {
    try {
      await authService.signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const listMove = (e) => {
    const line = document.querySelector(".line");

    let elLeft = e.target.getBoundingClientRect().left;
    let elRight = e.target.getBoundingClientRect().right;
    let elWidth = e.target.getBoundingClientRect().width;
    let elHeight = e.target.getBoundingClientRect().height;

    let parentLeft = e.target.closest(".gnb").getBoundingClientRect().left;
    let parentRight = e.target.closest(".gnb").getBoundingClientRect().right;
    let parentHeight = e.target.closest(".gnb").getBoundingClientRect().height;

    line.style.width = elWidth + "px";
    line.style.left = elLeft - parentLeft + "px";
    line.style.top = !Math.floor(parentRight - elRight)
      ? elHeight + 5 + "px"
      : parentHeight - elHeight / 3 + "px";
  };

  const listEvent = useCallback(() => {
    const list = document.querySelectorAll(".list");
    const line = document.querySelector(".line");

    list.forEach((li) => {
      li.addEventListener("mouseenter", listMove);
      li.addEventListener("mouseleave", () => {
        line.style.width = "0";
      });
    });
  }, []);

  const checkLoggedIn = (e) => {
    if (!loggedIn) {
      e.preventDefault();
      dispatch(
        setMessage({
          type: "Error",
          text: "로그인 후, 이용해 주세요.",
          moveText: "로그인 페이지로 이동",
          href: "/login",
        })
      );
      setIsModal(true);
    }
  };

  useEffect(() => {
    listEvent();
  }, [listEvent]);

  return (
    <Container>
      {isModal && <AlarmModal setIsModal={setIsModal} />}
      <Row>
        <LoGo>
          <NavLink to="/">
            ANIMAL
            <br /> HOSPITAL
          </NavLink>
        </LoGo>

        <SearchBox onSubmit={handleQuery} view={isSearch}>
          <SearchText
            type="text"
            value={text}
            placeholder="ex) 동래구, 동래구 낙민동..."
            onChange={handleText}
          />
          <SearchBtn>검색</SearchBtn>
        </SearchBox>

        <Nav>
          <List className="gnb">
            <Button className="list" onClick={searchHover}>
              search
            </Button>
            {item.map((menu, idx) => {
              return (
                <Item
                  login={loggedIn && menu.label === "login" && true}
                  key={idx}
                  id={menu.id}
                  className={menu.className}
                >
                  {menu.label !== "login" || !loggedIn ? (
                    menu.label !== "profile" && (
                      <NavLink to={menu?.href}>{menu?.label}</NavLink>
                    )
                  ) : (
                    <LogOut onClick={handleLogout}>log out</LogOut>
                  )}

                  {menu.id === "profile" && (
                    <InterestBox>
                      <NavLink to={menu?.href} onClick={checkLoggedIn}>
                        <Cnt>{interestCnt}</Cnt>
                        <FontAwesomeIcon icon={faMessage} />
                        {menu.label}
                      </NavLink>
                    </InterestBox>
                  )}
                </Item>
              );
            })}
          </List>
        </Nav>
      </Row>
    </Container>
  );
};
export default Header;

const Container = styled.header`
  position: relative;
  overflow-x: hidden;
  background: ${theme("beige")};
`;

const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120rem;
  height: 100%;
  margin: 0 auto;
  padding: 7rem 5rem;

  ${media.xs`
  /* align-items: baseline; */
  justify-content: space-between;
        position : relative;
        width : 100%;
        height : 28rem;
        margin : 0;
        `}

  ${media.xl`
  width : 100%;
  margin : 0;
  `}
`;

const LoGo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: ${theme("darkgreen")};
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  transition: all 0.5s;
  ${(props) =>
    props.view
      ? css`
          opacity: 1;
          z-index: 1;
          margin-right: 0;
        `
      : css`
          opacity: 0;
          z-index: -1;
          margin-right: 10rem;
        `}

  ${media.xs`
        position : absolute;
        justify-content : center;
        left : 0;
        bottom  : 15%;
        width : 100%;
        `}
`;
const SearchText = styled.input`
  width: 25rem;
  height: 3.5rem;
  padding-left: 1rem;
  border: solid 0.1rem #dfdfdf;
  border-bottom-left-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  font-size: 1.15rem;
  ${media.xs`
  width : 40rem;
  height : 5rem;
  `}
`;
const SearchBtn = styled.button`
  width: 5rem;
  height: 3.5rem;
  background: ${theme("sky")};
  font-size: 1.15rem;
  color: ${theme("darkgray")};
  font-weight: 600;
  border: none;
  border-bottom-right-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  cursor: pointer;

  &:hover {
    ${shadow(0)}
  }
  &:active {
    ${shadow(1)}
  }

  ${media.xs`
  width : 10rem;
  height : 5rem;
  `}
`;

const Nav = styled.nav``;
const List = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  position: relative;
  font-size: 1.75rem;
  margin-right: 2.5rem;
  cursor: pointer;

  ${(props) =>
    props.className === "line" &&
    css`
      content: "";
      position: absolute;
      height: 0.1rem;
      background: ${theme("darkgreen")};
      transition: all 0.5s;
      transition-timing-function: cubic- bezier(ease-in-out);
    `}

  &:hover {
    div {
      color: ${theme("green")};
    }
  }

  &:last-child {
    margin-right: 0;
    padding: 1.35rem 0;

    ${(props) =>
      props.login &&
      css`
        padding: 0;
      `}

    a {
      border: solid 0.1rem #dfdfdf;
      border-radius: 3rem;
      padding: 1.35rem 2rem;
      width: 100%;
      ${shadow(0)}
    }

    &:hover {
      a {
        ${shadow(1)}
        color: ${theme("green")};
      }
    }
  }
`;

const InterestBox = styled.div`
  position: relative;
  a {
    svg {
      position: absolute;
      top: -70%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
    }
  }
`;

const Cnt = styled.span`
  position: absolute;
  top: -88%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;

  ${media.xxs`
  top : -83%;
  `}
`;

const Button = styled.button`
  font-size: 1.75rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  margin-right: 2.5rem;

  &:hover {
    color: ${theme("red")};
  }
`;

const LogOut = styled.button`
  border: solid 0.1rem #dfdfdf;
  border-radius: 3rem;
  padding: 1.35rem 2rem;
  background: transparent;
  font-size: 1.75rem;
  ${shadow(0)}
  cursor: pointer;
  &:hover {
    ${shadow(1)}
    color: ${theme("green")};
  }
`;
