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

  useEffect(() => {
    AuthChanged();
  }, [AuthChanged, searchUser]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/create" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
