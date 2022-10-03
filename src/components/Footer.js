import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Nav>
          <List>
            <Item>
              <LoGoColumn></LoGoColumn>
            </Item>
            <Item>
              <ContentColumn></ContentColumn>
            </Item>
            <Item>
              <FollowColumn></FollowColumn>
            </Item>
            <Item>
              <InfoColumn></InfoColumn>
            </Item>
          </List>
        </Nav>
      </Row>
    </Container>
  );
};

export default Footer;

const Container = styled.footer``;
const Row = styled.div``;
const Nav = styled.nav``;
const List = styled.ul``;
const Item = styled.li``;

const LoGoColumn = styled.div``;
const LoGo = styled.div``;
const SnsBox = styled.div``;

const ContentColumn = styled.ul``;

const FollowColumn = styled.ul``;

const InfoColumn = styled.ul``;

const Content = styled.li``;
