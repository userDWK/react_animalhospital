import { Route, Routes } from "react-router-dom/dist";
import ViewMain from "../components/view/ViewMain";
import ViewHospital from "../components/view/ViewHospital";

const View = ({ hospitals, interestItemCnt }) => {
  return (
    <Routes>
      <Route path="/*" element={<ViewMain hospitals={hospitals} />} />
      <Route
        path="hospital"
        element={<ViewHospital interestItemCnt={interestItemCnt} />}
      />
    </Routes>
  );
};
export default View;
