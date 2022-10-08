import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { media, shadow } from "../assets/style/styleUtil";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../fbase";
import AlarmModal from "./AlarmModal";
import { setMessage } from "../redux/feature/messageSlice";

const item = [
  { label: "", className: "line" },
  { label: "profile", className: "list", id: "profile", href: "/profile" },
  { label: "view", className: "list", href: "/view" },
  { label: "login", className: "list", id: "login", href: "/login" },
];

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [text, setText] = useState("");
  const [isModal, setIsModal] = useState(false);
  const loggedIn = useSelector((state) => state.userData.loggedIn);
  const dispatch = useDispatch();

  const searchHover = (e) => {
    setIsSearch((prev) => !prev);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
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
    line.style.top = !Math.ceil(parentRight - elRight)
      ? elHeight + "px"
      : parentHeight - elHeight + "px";
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

  useEffect(() => {
    listEvent();
  }, [listEvent]);

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
  return (
    <Container>
      {isModal && <AlarmModal setIsModal={setIsModal} />}
      <Row>
        <LoGo>
          <NavLink to="/">PET HOSPITAL</NavLink>
        </LoGo>

        <SearchBox onSubmit={handleSearch} view={isSearch}>
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
                  st={loggedIn && menu.label !== "login" && true}
                  key={idx}
                  id={menu.id}
                  className={menu.className}
                >
                  {menu.label !== "login" || !loggedIn ? (
                    <NavLink
                      onClick={menu.id === "profile" && checkLoggedIn}
                      to={menu?.href}
                    >
                      {menu.label}
                    </NavLink>
                  ) : (
                    <LogOut onClick={handleLogout}>log out</LogOut>
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
  width: 120rem;
  margin: 0 auto;
  background: #ffe;

  ${media.lg`
  width : 100%;
  `}
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgray;
  }
`;

const LoGo = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: gray;
  display: flex;
  align-items: center;

  a {
    line-height: 1rem;
  }
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
          margin-bottom: 0;
          margin-right: 0;
        `
      : css`
          opacity: 0;
          z-index: -1;
          margin-bottom: 3rem;
          margin-right: 10rem;
        `}
`;
const SearchText = styled.input`
  width: 25rem;
  height: 3.5rem;
  padding-left: 1rem;
  border: solid 1px #dfdfdf;
  border-bottom-left-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;
const SearchBtn = styled.button`
  width: 5rem;
  height: 3.5rem;
  background: rgb(180, 220, 250);
  font-size: 1.15rem;
  color: #555;
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
`;

const Nav = styled.nav``;
const List = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  font-size: 1.5rem;
  margin-right: 2.5rem;
  cursor: pointer;

  ${(props) =>
    props.st &&
    css`
      &:last-child {
        padding: 0;
      }
    `}

  ${(props) =>
    props.className === "line" &&
    css`
      content: "";
      position: absolute;
      height: 0.1rem;
      background: maroon;
      transition: all 0.5s;
      transition-timing-function: cubic- bezier(ease-in-out);
    `}

  &:hover {
    font-weight: 600;
  }

  &:last-child {
    margin-right: 0;
    padding: 1.35rem 0;
    a {
      border: solid 1px #dfdfdf;
      border-radius: 3rem;
      padding: 1.35rem 2rem;
      width: 100%;
      ${shadow(0)}
    }

    &:hover {
      a {
        ${shadow(1)}
        color: rgb(21, 177, 125);
      }
    }
  }
`;
const Button = styled.button`
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  margin-right: 2.5rem;

  &:hover {
    color: red;
    font-weight: 600;
  }
`;

const LogOut = styled.button`
  border: solid 1px #dfdfdf;
  border-radius: 3rem;
  padding: 1.35rem 2rem 1.35rem;
  background: transparent;
  font-size: 1.5rem;
  ${shadow(0)}
  cursor: pointer;
  &:hover {
    font-weight: 600;
    ${shadow(1)}
    color: rgb(21, 177, 125);
  }
`;
