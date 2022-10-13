const a = [
  {
    a: [{ c: [{ gugun: "a", area: "c" }] }, { y: [{ gugun: "a", area: "y" }] }],
  },
  {
    b: [{ d: [{ gugun: "b", area: "d" }] }, { z: [{ gugun: "b", area: "z" }] }],
  },
];

const abc = {
  gugun: "a",
  area: "z",
};

// [
//   {
//     [action.payload.gugun]: [{ [action.payload.area]: [action.payload] }],
//   },
// ];
let districtIsExist = false;
let areaIsExist = false;

const hospitalsData = a.map((data) => {
  const districtData = Object.keys(data).map((district) => {
    if (district === abc.gugun) {
      districtIsExist = true;

      const bodyData = Object.values(data).map((obj) => {
        // console.log(obj);

        const areaData = obj.map((el, idx) => {
          if (Object.keys(el).join("") === abc.area) {
            areaIsExist = true;
            // console.log(Object.values(el)[idx], 123123);
            // console.log(...obj[0][abc.area]);
            return { [abc.area]: [...obj[idx][abc.area], abc] };
          } else {
            // console.log(Object.values(el));
            return { [Object.keys(el).join("")]: Object.values(el)[0] };
          }
        });
        return areaIsExist ? areaData : [...areaData, { [abc.area]: [abc] }];
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
  setHospitals(hospitalsData);
} else {
  setHospitals((prev) => [
    ...prev,
    { [hospital.gugun]: [{ [hospital.area]: hospital }] },
  ]);
}

// a.map((el) => {
//   Object.values(el)[0].map((e) => {
//     // console.log(Object.keys(e));
//     console.log({ a: [[...Object.values(e)[0]], { c: 3 }] });

// const data = [...Object.values(area)[0], action.payload ];
// console.log(
//   Object.values(e).map((d, i) => {
//     console.log(d, i);
//   })
// );
// Object.values(e).map((d) => console.log(d));
// const str = Object.keys(e)[0];
// const data = Object.values(e);
// console.log(data);
// console.log([ ...data[0], a: 1 ]);
// const z = Object.assign({}, [...data, { a: 1, b: 1 }]);
// console.log(z);
// console.log({
//   [str]: [data, { a: 100, b: 100 }],
// });
// console.log("str" + str, "data" + [data]);
//   });
// });

// const b

// const A = () => {
//   const [d, setD] = useState([]);
//   //naver map api 전화번호로 query하여 thum img 추출한 후, spread 문법으로 hospital 객체와 병합.
//   const getImgFromNaverMap = useCallback(async (hospital) => {
//     try {
//       const url = `naver/v5/api/search?caller=pcweb&query=${hospital.tel}&type=all&page=1&displayCount=1&isPlaceRecommendationReplace=true&lang=ko`;
//       await axios
//         .get(url, {
//           headers: {
//             authority: "map.naver.com",
//             method: "GET",
//             "content-type": "application/json",
//             "X-NCP-APIGW-API-KEY-ID": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID}`,
//             "X-NCP-APIGW-API-KEY": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY}`,
//           },
//         })
//         .then((res) => {
//           const info = res?.data?.result?.place?.list[0];
//         });
//     } catch (e) {
//       console.error(e);
//       return;
//     }
//   }, []);

//   // 공공api 부산 동물 병원 정보 get 요청 및 area 추출.
//   const RequestToGetHospitalData = useCallback(async () => {
//     try {
//       const url = `https://animalhospital.herokuapp.com/http://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=${process.env.REACT_APP_PUBLICK_ANIMAL_HOSPITAL_API_KEY}&numOfRows=3&pageNo=1&resultType=json`;
//       await axios.get(url).then(async (res) => {
//         res.data.getTblAnimalHospital.body.items.item.forEach(
//           async (hospital) => {
//             //동 데이터 추출.
//             const startIdx = hospital.road_address.indexOf("(") + 1;
//             const endIdx =
//               hospital.road_address.indexOf("동,") !== -1
//                 ? hospital.road_address.indexOf("동,") + 1
//                 : hospital.road_address.indexOf("동)") + 1;
//             const area =
//               hospital.road_address.slice(startIdx, endIdx) || "도로명";

//             getImgFromNaverMap({ area, ...hospital });
//           }
//         );
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }, [getImgFromNaverMap]);

//   useEffect(() => {
//     RequestToGetHospitalData();
//   }, []);
//   return 1;
// };
