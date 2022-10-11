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
import View from "./pages/View";
import axios from "axios";
import firebase from "firebase/compat/app";
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

  // 동물병원정보 + thum img 객체 firestore 저장. region에 해당하는 doc 존재 유무에 따라, set또는 update.
  const saveHospitalDataInDb = useCallback(async (hospital, region) => {
    try {
        dbService.collection(hospital.gugun).onSnapshot(async(snap)=>{
          // console.log(snap)
        if(!snap.empty) {
          await dbService
          .collection(hospital.gugun)
          .doc(region)
          .set({
            hospitals: firebase.firestore.FieldValue.arrayUnion({
              ...hospital,
            }),
          });
        } else {
          await dbService
            .collection(hospital.gugun)
            .doc(region)
            .update({
              hospitals: firebase.firestore.FieldValue.arrayUnion({
                ...hospital,
              }),
            });
        }
      }
        );
      // dbService
      //   .collection(hospital.gugun)
      //   .doc(region)
      //   .onSnapshot(async (snap) => {
      //     if (!snap.exists) {
           
      //     } 
      //   });
    } catch (e) {
      console.log(e);
    }
  }, []);

  //naver map api 전화번호로 query하여 thum img 추출한 후, spread 문법으로 hospital 객체와 병합.
  const getImgFromNaverMap = useCallback(
    async (hospital, region) => {
      try {
        const url = `https://map.naver.com/v5/api/search?caller=pcweb&query=${hospital.tel}&type=all&page=1&displayCount=1&isPlaceRecommendationReplace=true&lang=ko`;
        await axios
          .get(url, {
            headers: {
              'authority': 'map.naver.com',
              'method': 'GET',
              'scheme': 'https',
              'accept':
                'application/json, text/plain, */*',
              'accept-encoding': 'gzip, deflate, br',
              'accept-language': 'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4',
              'content-type' : 'application/json',
              'cache-control': 'no-cache',
              'expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
              'cookie': 'NNB=ZHREYBKYJGZWA; ASID=7c6f74d0000017a324f783a0000004f; NV_WETR_LOCATION_RGN_M="MDkxNDAxMDQ="; _ga=GA1.1.843260892.1631082249; _ga_8P4PY65YZ2=GS1.1.1631546146.1.0.1631546150.0; NV_WETR_LAST_ACCESS_RGN_M="MDkxNDAxMDQ="; MM_NEW=1; NFS=2; NaverSuggestUse=use%26unuse; _gcl_au=1.1.684846510.1636646068; nx_ssl=2; page_uid=4bf320b5-0774-4667-9eca-95099ebb77e8',
              // "origin": "http://localhost:3000",
              'pragma': 'no-cache',
              'referer': 'https://map.naver.com/',
              'sec-ch-ua':
               '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': 'Windows',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'cross-site',
              'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',

              "X-NCP-APIGW-API-KEY-ID": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID}`,
              "X-NCP-APIGW-API-KEY": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY}`,
            },
          })
          .then((res) => {
            console.log(res?.data?.result?.place?.list[0]);
            saveHospitalDataInDb(
              { ...hospital, thumUrl: res.data.result.place.list[0].thumUrl },
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
    // try {
    //   const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=20&pageNo=1&resultType=json`;
    //   await axios.get(url).then(async (res) => {
    //     res.data.getTblAnimalHospital.body.items.item.map(async (hospital) => {
    //       //동 데이터 추출.
    //       const searchStartIdx = hospital.road_address.indexOf("(") + 1;
    //       const searchEndIdx =
    //         hospital.road_address.indexOf("동,") !== -1
    //           ? hospital.road_address.indexOf("동,") + 1
              : hospital.road_address.indexOf("동)") + 1;
          const region = hospital.road_address.slice(
            searchStartIdx,
            searchEndIdx
          );
          getImgFromNaverMap(hospital, region);
        //   await dbService
        //     .collection(hospital.gugun)
        //     .get()
        //     .then((querySnapshot) => {
        //       let flag = true;
        //       querySnapshot.forEach((doc) => {
        //         // console.log(doc.data().hospitals);
        //         doc.data()?.hospitals?.forEach((hos) => {
        //           hospital.animal_hospital === hos?.animal_hospital &&
        //             (flag = false);
        //         });
        //       });
              
        //       flag && getImgFromNaverMap(hospital, region);
        //     });
        });
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
        <Route path={"/react_animalhospital"} element={<Main />} />
        <Route path={"/"} element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/create" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/*" element={<View />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
