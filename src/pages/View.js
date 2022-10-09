import styled from "styled-components";
import { media, theme } from "../assets/style/styleUtil";

const View = () => {
  return 1;
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80rem;
  margin: 0 auto;
  text-align: center;
  font-family: "Cormorant", serif;
  font-size: 2rem;
  background: ${theme("beige")};

  ${media.xl`
  width : 100%;
  `}
`;
const Column = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
`;

export default View;
