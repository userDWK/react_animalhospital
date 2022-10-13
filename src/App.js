import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import "./assets/style/styles.css";
import { useCallback, useEffect, useState } from "react";
import { authService, dbService } from "./fbase";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUid, setUser } from "./redux/feature/userSlice";
import { getDoc } from "firebase/firestore";
import Profile from "./pages/Profile";
import axios from "axios";
<<<<<<< HEAD
import View from "./pages/View";
import { setHospitals } from "./redux/feature/interestSlice";
import { setHospitalsInfo } from "./redux/feature/storageSlice";
=======
import firebase from "firebase/compat/app";
import View from "./pages/View";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  //naver map api 전화번호로 query하여 thum img 추출한 후, spread 문법으로 hospital 객체와 병합.
  const getImgFromNaverMap = useCallback(async (hospital) => {
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

          const hos = {
            ...hospital,
            thumUrl: info.thumUrl,
            bizhourInfo: info.bizhourInfo,
            homepage: info.homepage,
            // parking :
          };

          // 시작

          // if (!hospitals) {
          //   console.log(hospitals);
          //   setHospitals([
          //     {
          //       [hos.gugun]: [{ [hos.area]: [hos] }],
          //     },
          //   ]);
          // } else {
          let districtIsExist = false;
          let areaIsExist = false;

          const hospitalsData = hospitals?.map((data) => {
            const districtData = Object.keys(data).map((district) => {
              if (district === hos.gugun) {
                districtIsExist = true;

                const bodyData = Object.values(data).map((obj, i) => {
                  // console.log(obj);
                  const areaData = obj.map((el, idx) => {
                    if (Object.keys(el).join("") === hos.area) {
                      areaIsExist = true;
                      // console.log(Object.values(el)[idx], 123123);
                      // console.log(...obj[0][hos.area]);
                      return { [hos.area]: [...obj[idx][hos.area], hos] };
                    } else {
                      // console.log(Object.values(el));
                      return {
                        [Object.keys(el).join("")]: Object.values(el)[0],
                      };
                    }
                  });
                  return areaIsExist
                    ? areaData
                    : [...areaData, { [hos.area]: [hos] }];
                });
                return { [district]: bodyData };
              } else {
                return data;
              }
            });
            // console.log(districtData);
            return districtData[0];

            // console.log(data);
            // console.log(hospitalsData[0]);
          });
          // console.log(hospitalsData);
          // console.log(a);
          if (districtIsExist) {
            console.log(hospitalsData);
            setHospitals(hospitalsData);
          } else {
            setHospitals((prev) =>
              prev
                ? [...prev, { [hos.gugun]: [{ [hos.area]: [hos] }] }]
                : [{ [hos.gugun]: [{ [hos.area]: [hos] }] }]
            );
          }
          // }
          //끝
        });
    } catch (e) {
      console.error(e);
      return;
=======
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
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
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
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
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
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
    }
  }, []);
  console.log(hospitals);
  // const a = () => {
  //   let index1 = true;
  //   let index2 = true;

<<<<<<< HEAD
  //   const stat = hospitals?.map((gugun, idx) => {
  //     if (index1 && Object.keys(gugun)[0] === hos.gugun) {
  //       if (index1) {
  //         let key = "";
  //         const data = [];
  //         const arr = Object.values(gugun).map((area) => {
  //           if (index2 && Object.keys(area[0])[0] === hos.area) {
  //             index2 = false;
  //             key = Object.keys(area[0])[0].toString();
  //             data = [...Object.values(area[0])[0], hos];
  //           }
  //           return area;
  //         });
  //         index1 = false;
  //         return index2 ? [...arr, { [key]: data }] : [...arr];
  //       }
  //       return gugun;
  //     }
  //   });
  // };
=======
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
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61

  // 공공api 부산 동물 병원 정보 get 요청 및 area 추출.
  const RequestToGetHospitalData = useCallback(async () => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=2&pageNo=1&resultType=json`;
=======
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=10&pageNo=1&resultType=json`;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=10&pageNo=1&resultType=json`;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
      const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=10&pageNo=1&resultType=json`;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
      await axios.get(url).then(async (res) => {
        res.data.getTblAnimalHospital.body.items.item.forEach(
          async (hospital) => {
            //동 데이터 추출.
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            const startIdx = hospital.road_address.indexOf("(") + 1;
            const endIdx =
              hospital.road_address.indexOf("동,") !== -1
                ? hospital.road_address.indexOf("동,") + 1
                : hospital.road_address.indexOf("동)") + 1;
            const area =
              hospital.road_address.slice(startIdx, endIdx) || "도로명";
            getImgFromNaverMap({ area, ...hospital });
=======
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
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
