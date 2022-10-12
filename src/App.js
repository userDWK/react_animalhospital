import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import "./assets/style/styles.css";
import { useCallback, useEffect } from "react";
import { authService, dbService } from "./fbase";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUid, setUser } from "./redux/feature/userSlice";
import { getDoc } from "firebase/firestore";
import Profile from "./pages/Profile";
import axios from "axios";
import firebase from "firebase/compat/app";
import View from "./pages/View";
function App() {
  const dispatch = useDispatch();

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

  // 동물병원정보 + thum img 객체 firestore 저장. 구에 해당하는 doc 유무에 따라, set또는 update.
  const saveHospitalDataInDb = useCallback(async (hospital, region) => {
    try {
      const docRef = dbService.collection("hospitals")?.doc(hospital.gugun);
      const docSnap = await getDoc(docRef);
      if (docSnap.data() === undefined) {
        // console.log("empty");
        await dbService
          .collection("hospitals")
          .doc(hospital.gugun)
          .set({
            [region]: firebase.firestore.FieldValue.arrayUnion({
              ...hospital,
            }),
          });
      } else {
        // console.log("no empty");
        await dbService
          .collection("hospitals")
          .doc(hospital.gugun)
          .update({
            [region]: firebase.firestore.FieldValue.arrayUnion({
              ...hospital,
            }),
          });
      }
    } catch (e) {
      console.error("잘못되었다");
    }
  }, []);

  //naver map api 전화번호로 query하여 thum img 추출한 후, spread 문법으로 hospital 객체와 병합.
  const getImgFromNaverMap = useCallback(
    async (hospital, region) => {
      try {
        const url = `naver/v5/api/search?caller=pcweb&query=${hospital.tel}&type=all&page=1&displayCount=1&isPlaceRecommendationReplace=true&lang=ko`;
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
            saveHospitalDataInDb(
              {
                ...hospital,
                thumUrl: info.thumUrl,
                bizhourInfo: info.bizhourInfo,
                homepage: info.homepage,
                // parking :
              },
              region
            );
          });
      } catch (e) {
        console.error(e);
        return;
      }
    },
    [saveHospitalDataInDb]
  );

  // 공공api 부산 동물 병원 정보 get 요청.
  const RequestToGetHospitalData = useCallback(async () => {
    try {
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=10&pageNo=1&resultType=json`;
      await axios.get(url).then(async (res) => {
        res.data.getTblAnimalHospital.body.items.item.forEach(
          async (hospital) => {
            //동 데이터 추출.
            const searchStartIdx = hospital.road_address.indexOf("(") + 1;
            const searchEndIdx =
              hospital.road_address.indexOf("동,") !== -1
                ? hospital.road_address.indexOf("동,") + 1
                : hospital.road_address.indexOf("동)") + 1;
            const region =
              hospital.road_address.slice(searchStartIdx, searchEndIdx) ||
              "도로명";

            //response item을 firestore search 하여, 없을 시, getImgFromNaverMap 호출.
            await dbService
              .collection("hospitals")
              .get()
              .then((querySnapshot) => {
                let flag = true;
                querySnapshot.forEach((doc) => {
                  doc?.data()[region]?.forEach((hos) => {
                    hospital.animal_hospital === hos?.animal_hospital &&
                      (flag = false);
                  });
                });
                flag && getImgFromNaverMap(hospital, region);
              });
          }
        );
      });
    } catch (e) {
      console.error(e);
    }
  }, [getImgFromNaverMap]);

  useEffect(() => {
    checkAuthChanged();
    RequestToGetHospitalData();
  }, [checkAuthChanged, RequestToGetHospitalData]);

  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/react_animalhospital" element={<Main />} /> */}
        <Route path="/*" element={<Main />} />
        <Route path="login" element={<Auth />} />
        <Route path="create" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="view/*" element={<View />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
