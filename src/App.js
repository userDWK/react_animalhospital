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
import XMLParser from "react-xml-parser";

function App() {
  const dispatch = useDispatch();
  const [hospitals, setHospitals] = useState(null);
  const [interestCnt, setInterestCnt] = useState(0);

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
    let finalHospitals = null;
    console.log(hospitalArr);
    try {
      hospitalArr.map(async (hospital) => {
        axios.defaults.baseURL =
          process.env.NODE_ENV === "development"
            ? "https://animalhospital.herokuapp.com/http://localhost:3000/"
            : "https://animalhospital.herokuapp.com/https://userdwk.github.io/react_animalhospital/";
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

            const hos = {
              ...hospital,
              thumUrl: info?.thumUrl,
              bizhourInfo: info?.bizhourInfo,
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
    let hospitalArr = [];
    try {
      for (let i = 1; i < 2; i++) {
        const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=10&pageNo=${i}&resultType=json`;
        await axios.get(url).then((res) => {
          const data = res.data.getTblAnimalHospital.body.items.item.map(
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
          hospitalArr = hospitalArr ? [...hospitalArr, ...data] : [...data];
        });
      }
    } catch (e) {
      console.error(e);
    }
    return hospitalArr;
  }, []);

  const interestItemCnt = useCallback(() => {
    const item = JSON.parse(localStorage.getItem("INTEREST_HOSPITAL"));
    if (!item) return;
    let cnt = 0;
    Object.keys(item).forEach((area) => {
      cnt += item[area].length;
    });
    setInterestCnt(cnt);
  }, [interestCnt]);

  useEffect(() => {
    checkAuthChanged();
    RequestToGetHospitalData().then((res) => getImgFromNaverMap(res));
    interestItemCnt();
  }, [checkAuthChanged, getImgFromNaverMap, RequestToGetHospitalData]);

  return (
    <>
      <Header interestCnt={interestCnt} />
      <Routes>
        <Route path="/react_animalhospital/*" element={<Main />} />
        <Route path="/*" element={<Main />} />
        <Route path="login" element={<Auth />} />
        <Route path="create" element={<Auth />} />
        <Route path="profile" element={<Profile hospitals={hospitals} />} />
        <Route
          path="view/*"
          element={
            <View hospitals={hospitals} interestItemCnt={interestItemCnt} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
