import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../style/styleUtil";

const sns = [
  { href: "/", icon: faFacebook },
  { href: "/", icon: faLink },
  { href: "/", icon: faInstagram },
];

const contents = [
  { href: "/home", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];

const follows = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/faq", label: "FAQ" },
  { href: "/help", label: "Help Center" },
];

const contacts = [
  { href: "mailto:skdoo1213@gmail.com", label: "skdoo1213@gmail.com" },
  { href: "phone:010-1111-2222", label: "010-1111-2222" },
  { href: "/", label: `767 5th Street, 21st Floor, New York, USA` },
];

const Footer = () => {
  return (
    <Container>
      <Row>
        <Nav>
          <List>
            <Item>
              <LoGoColumn>
                <LoGo>
                  <NavLink to="/">PET HOSPITAL</NavLink>
                </LoGo>
                <SnsBox>
                  {sns.map((icon, idx) => {
                    return (
                      <a href={icon.href} key={idx}>
                        <FontAwesomeIcon icon={icon.icon} />
                      </a>
                    );
                  })}
                </SnsBox>
              </LoGoColumn>
            </Item>

            <Item>
              <Title>Content</Title>
              <ContentColumn>
                {contents.map((content, idx) => {
                  return (
                    <Content key={idx}>
                      <NavLink to={content.href}>{content.label}</NavLink>
                    </Content>
                  );
                })}
              </ContentColumn>
            </Item>

            <Item>
              <Title>Follow</Title>
              <FollowColumn>
                {follows.map((follow, idx) => {
                  return (
                    <Content key={idx}>
                      <NavLink to={follow.href}>{follow.label}</NavLink>
                    </Content>
                  );
                })}
              </FollowColumn>
            </Item>

            <Item>
              <Title>Contact</Title>
              <ContactColumn>
                {contacts.map((contact, idx) => {
                  return (
                    <Content key={idx}>
                      <NavLink to={contact.href}>{contact.label}</NavLink>
                    </Content>
                  );
                })}
              </ContactColumn>
            </Item>

            <Copy>
              &copy; Animal Hospital agency 2022. All rights reserved.
            </Copy>
          </List>
        </Nav>
      </Row>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  position: relative;
  width: 120rem;
  margin: 0 auto;

  &::before {
    content: "";
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgray;
  }

  ${media.xl`
  width : 100%;
  `}
`;
const Row = styled.div``;
const Nav = styled.nav``;
const List = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 5rem;
`;
const Item = styled.li`
  ${media.xs`
  &:nth-child(4) {
    text-align : center;
    width : 100%;

    &::before {
      content: "";
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgray;
    margin : 3rem 0;
    }
  }
  `}
`;
const Title = styled.p`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const LoGoColumn = styled.div``;
const LoGo = styled.div`
  font-size: 2rem;
`;
const SnsBox = styled.div`
  font-size: 1.75rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

const ContentColumn = styled.ul``;

const FollowColumn = styled.ul``;

const ContactColumn = styled.ul``;

const Content = styled.li`
  font-size: 1.5rem;
  padding: 0.35rem 0;
`;

const Copy = styled.div`
  margin-top: 3rem;
  padding: 3rem 0;
  border-top: solid 1px #dfdfdf;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
`;
