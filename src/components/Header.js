import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { media, shadow } from "../assets/style/styleUtil";
import { useSelector } from "react-redux";
import { authService } from "../fbase";

const item = [
  { label: "", className: "line" },
  { label: "view", href: "/view" },
  { label: "login", href: "/login" },
];

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [text, setText] = useState("");

  const loggedIn = useSelector((state) => state.userData.loggedIn);

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
  return (
    <Container>
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
          <List>
            <Button onClick={searchHover}>search</Button>
            {item.map((menu, idx) => {
              return (
                <Item key={idx}>
                  {menu.label !== "login" || !loggedIn ? (
                    <NavLink to={menu?.href}>{menu.label}</NavLink>
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
  ${(props) =>
    props.view
      ? css`
          display: block;
        `
      : css`
          display: none;
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
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  font-size: 1.5rem;
  margin-right: 2.5rem;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }

  &:last-child {
    margin-right: 0;
    padding: 1.35rem 0;
    a {
      border: solid 1px #dfdfdf;
      border-radius: 3rem;
      padding: 1.35rem 2rem 1.35rem;
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
  ${shadow(0)}
  cursor: pointer;
  &:hover {
    font-weight: 600;
    ${shadow(1)}
    color: rgb(21, 177, 125);
  }
`;
