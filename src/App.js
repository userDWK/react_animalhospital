import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import "./assets/style/styles.css";
import { useCallback, useEffect, useState } from "react";
import { authService, dbService } from "./fbase";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUid, setUser } from "./redux/feature/userSlice";
import { getDoc } from "firebase/firestore";
import Profile from "./pages/Profile";
import axios from "axios";
import View from "./pages/View";

function App() {
  const dispatch = useDispatch();
  const [hospitals, setHospitals] = useState(null);

  //로그인 상태일 시, 사용자 정보 전역 state dispatch.
  const saveStateFromDbUsers = useCallback(
    async (uid) => {
      const docRef = dbService.collection("users").doc(uid);
      const docSnap = await getDoc(docRef);
      dispatch(setUser(docSnap.data()));
    },
    [dispatch]
  );

  //로그인/로그아웃 변경 감지. 로그인 유무 및 uid 전역 state dispatch.
  const checkAuthChanged = useCallback(async () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUid(user.uid));
        dispatch(setIsLoggedIn(true));
        saveStateFromDbUsers(user.uid);
      } else {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser({}));
        dispatch(setUid({}));
        console.log("로그아웃 상태");
      }
    });
  }, [dispatch, saveStateFromDbUsers]);

  //naver map api 전화번호로 query하여 thum img 추출한 후, spread 문법으로 hospital 객체와 병합.
  const getImgFromNaverMap = useCallback((hospitalArr) => {
    console.log(hospitalArr);
    let finalHospitals = null;
    try {
      hospitalArr.map(async (hospital) => {
        const url = `/naver/v5/api/search?query=${hospital.tel}&type=all&page=1&displayCount=1&isPlaceRecommendationReplace=true&lang=ko`;
        await axios
          .get(url, {
            headers: {
              authority: "map.naver.com",
              method: "GET",
              "content-type": "application/json",
              "X-NCP-APIGW-API-KEY-ID": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID}`,
              "X-NCP-APIGW-API-KEY": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY}`,
            },
          })
          .then((res) => {
            const info = res?.data?.result?.place?.list[0];
            // console.log(info);
            const hos = {
              ...hospital,
              thumUrl: info?.thumUrl,
              bizhourInfo: info?.bizhourInfo,
              homepage: info?.homepage,
              // parking :
            };

            if (!finalHospitals) {
              finalHospitals = {
                [hos.gugun]: { [hos.area]: [hos] },
                ...finalHospitals,
              };
            } else {
              if (Object.keys(finalHospitals).includes(hos.gugun)) {
                if (Object.keys(finalHospitals[hos.gugun]).includes(hos.area)) {
                  finalHospitals = {
                    ...finalHospitals,
                    [hos.gugun]: {
                      ...finalHospitals[hos.gugun],
                      [hos.area]: [...finalHospitals[hos.gugun][hos.area], hos],
                    },
                  };
                } else {
                  finalHospitals = {
                    ...finalHospitals,
                    [hos.gugun]: {
                      ...finalHospitals[hos.gugun],
                      [hos.area]: [hos],
                    },
                  };
                }
              } else {
                finalHospitals = {
                  ...finalHospitals,
                  [hos.gugun]: { [hos.area]: [hos] },
                };
              }
            }
          });
        setHospitals(finalHospitals);
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }, []);

  // 공공api 부산 동물 병원 정보 get 요청 및 area 추출.
  const RequestToGetHospitalData = useCallback(async () => {
    let hospitalArr = {};
    try {
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=7&pageNo=1&resultType=json`;
      await axios.get(url).then((res) => {
        hospitalArr = res.data.getTblAnimalHospital.body.items.item.map(
          (hospital) => {
            //동 데이터 추출.
            const startIdx = hospital.road_address.indexOf("(") + 1;
            const endIdx =
              hospital.road_address.indexOf("동,") !== -1
                ? hospital.road_address.indexOf("동,") + 1
                : hospital.road_address.indexOf("동)") + 1;
            const area =
              hospital.road_address.slice(startIdx, endIdx) || "도로명";
            return { area, ...hospital };
          }
        );
      });
    } catch (e) {
      console.error(e);
    }
    return hospitalArr;
  }, []);

  useEffect(() => {
    checkAuthChanged();
    const data = RequestToGetHospitalData();
    data.then((res) => {
      getImgFromNaverMap(res);
    });
  }, [checkAuthChanged, getImgFromNaverMap, RequestToGetHospitalData]);

  return (
    <>
      <Header hospitals={hospitals} />
      <Routes>
        <Route path="/react_animalhospital/*" element={<Main />} />
        <Route path="/*" element={<Main />} />
        <Route path="login" element={<Auth />} />
        <Route path="create" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="view/*" element={<View hospitals={hospitals} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
