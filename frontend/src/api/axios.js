// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", 
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // backend URL
// });

// // Add token to every request if exists
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://node-backend-project-zafaf.onrender.com/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;






// import axios from "axios";

// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
// });

// API.interceptors.request.use(
//   (config) => {
//     const userInfo = localStorage.getItem("userInfo");

//     if (userInfo) {
//       const parsedUser = JSON.parse(userInfo);
//       if (parsedUser?.token) {
//         config.headers.Authorization = `Bearer ${parsedUser.token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;





import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default API;
