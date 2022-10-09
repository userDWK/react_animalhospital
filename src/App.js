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

  const searchUser = useCallback(
    async (uid) => {
      const docRef = dbService.collection("users").doc(uid);
      const docSnap = await getDoc(docRef);
      dispatch(setUser(docSnap.data()));
    },
    [dispatch]
  );

  const AuthChanged = useCallback(async () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUid(user.uid));
        dispatch(setIsLoggedIn(true));
        searchUser(user.uid);
      } else {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser({}));
        dispatch(setUid({}));
        console.log("로그아웃 상태");
      }
    });
  }, [dispatch, searchUser]);

  const abcd = useCallback(async () => {
    try {
      const url =
        "https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=z8evE4fB63MK/VnJ7rRADKHyzwfu5kpDy4AV2FAzq4SdiIZC67gX/T5pvRRvfw3eGAiDpotkNHBB3zFAmNsqHw==&numOfRows=20&pageNo=1&resultType=json";
      await axios.get(url).then((res) => {
        // console.log(res);
        res.data.getTblAnimalHospital.body.items.item.map(async (hospital) => {
          // console.log(hospital);
          const searchStartIdx = hospital.road_address.indexOf("(") + 1;
          const searchEndIdx =
            hospital.road_address.indexOf("동,") !== -1
              ? hospital.road_address.indexOf("동,") + 1
              : hospital.road_address.indexOf("동)") + 1;
          // console.log(searchStartIdx, searchEndIdx);
          const region = hospital.road_address.slice(
            searchStartIdx,
            searchEndIdx
          );
          // console.log(region, region.length);
          try {
            dbService
              .collection(hospital.gugun)
              .doc(region)
              .onSnapshot((snap) => {
                if (!snap.exists) {
                  console.log("set");

                  dbService
                    .collection(hospital.gugun)
                    .doc(region)
                    .set({
                      hospitals: firebase.firestore.FieldValue.arrayUnion({
                        ...hospital,
                      }),
                    });
                } else {
                  console.log("update");
                  dbService
                    .collection(hospital.gugun)
                    .doc(region)
                    .update({
                      hospitals: firebase.firestore.FieldValue.arrayUnion({
                        ...hospital,
                      }),
                    });
                }
              });
          } catch (e) {
            console.log(e);
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    AuthChanged();
    abcd();
  }, [AuthChanged, searchUser, abcd]);

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
