import styled from "styled-components";
import { media, shadow, theme } from "../../assets/style/styleUtil";

const AuthInput = ({ ...rest }) => {
  return (
    <InputBox>
      <Label htmlFor={rest.htmlFor}>{rest.text}</Label>
      <Input {...rest} required></Input>
    </InputBox>
  );
};

export default AuthInput;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  margin: 5rem auto;

  /* ${media.xs`
  width : 70%;
  `} */
`;
const Label = styled.label`
  padding: 0 0 0.5rem 0.5rem;
  color: ${theme("gray")};
  font-size: 1.5rem;
  text-align: left;
  font-weight: 600;

  ${media.xs`
  font-size : 2.5rem;
  `}
`;
const Input = styled.input`
  padding: 1rem 0 1rem 1rem;
  font-size: 1.4rem;
  border: solid 0.2rem lightgray;
  border-radius: 0.5rem;

  &:focus {
    ${shadow(2)};
    outline: none;
  }

  ${media.xs`
  padding : 1.5rem 0 1.5rem 1.5rem;
  `}
`;
