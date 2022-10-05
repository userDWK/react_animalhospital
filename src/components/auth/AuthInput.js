import styled from "styled-components";

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
`;
const Label = styled.label`
  padding: 0 0 0.5rem 0.5rem;
  color: gray;
  font-size: 1.5rem;
  text-align: left;
  font-weight: 600;
`;
const Input = styled.input`
  padding: 1rem 0 1rem 1rem;
  font-size: 1.4rem;
`;
