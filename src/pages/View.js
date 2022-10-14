import { Route, Routes } from "react-router-dom/dist";
import ViewMain from "../components/view/ViewMain";
import ViewHospital from "../components/view/ViewHospital";

const View = ({ hospitals }) => {
  return (
    <Routes>
      <Route path="/*" element={<ViewMain hospitals={hospitals} />} />
      <Route path="hospital" element={<ViewHospital />} />
    </Routes>
  );
};
export default View;
