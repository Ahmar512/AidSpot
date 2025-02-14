import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebase.js"

const auth = getAuth(app);

export const useAuthStore = create((set)=>({
    authUser : null,
    places:[],
    library:['places'],



    signup: async (data) =>{
        // createUserWithEmailAndPassword(auth, user.email, user.password).then((value)=>{
        //   // set({authUser: value});
        //   console.log(value);
        // }).catch((error) =>{
        //   console.log("Error in signin",error.message)
        // })
        try {
          const userCredential  = await createUserWithEmailAndPassword(auth, data.email, data.password);
          const user = userCredential.user;
          
          await updateProfile(user, {
            displayName: data.name,
          });
          console.log(user);
          set({authUser: user});
          localStorage.setItem('authUser', JSON.stringify(user));
        } catch (error) {
          console.log("error in signup:", error.message);
        }
    },
    login: async(data) =>{
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        console.log(user);
        set({authUser: user});
        localStorage.setItem('authUser', JSON.stringify(user));
      } catch (error) {
        console.log(error.message);
      }
    },
    fetchData: async (url, requestBody, API_KEY)=>{
        try {
          const response = await axios.post(url, requestBody, {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": API_KEY,
              "X-Goog-FieldMask": "*",
            },
          });
      
          console.log("Nearby hospital:", response.data);
          set({places:response.data.places})
        } catch (error) {
          console.error("Error fetching nearby places:", error.response?.data || error.message);
        }
    },
    checkAuth:()=>{
      const result = localStorage.getItem('authUser');
      set({authUser: JSON.parse(result) });
    },
    logout:() =>{
      set({authUser: null});
      localStorage.removeItem('authUser');
    }

}))