import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../utils/firebase.js"
import toast from "react-hot-toast";


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create((set)=>({
    authUser : null,
    places:[],
    library:['places'],
    isLoading:false,



    signup: async (data) =>{
        set({isLoading: true});
        try {
          
          const userCredential  = await createUserWithEmailAndPassword(auth, data.email, data.password);
          const user = userCredential.user;
          
          await updateProfile(user, {
            displayName: data.name,
          });
          console.log(user);
          set({authUser: user});
          toast.success("Account created successfully");
          localStorage.setItem('authUser', JSON.stringify(user));
        } catch (error) {
          toast.error(error.message);
          console.log("error in signup:", error.message);
        }finally{
          set({isLoading:false});
        }
    },
    login: async(data) =>{
      set({isLoading:true})
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        console.log(user);
        set({authUser: user});
        toast.success("Logged in successfully");
        localStorage.setItem('authUser', JSON.stringify(user));
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }finally{
        set({isLoading:false});
      }
    },
    signupWithGoogle: async() =>{
      
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        console.log(user);
        set({authUser: user});
        toast.success("Logged in successfully");
        localStorage.setItem('authUser', JSON.stringify(user));
      } catch (error) {
        toast.error(error.message);
        console.log(error);
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