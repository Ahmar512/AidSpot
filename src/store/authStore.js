import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set)=>({
    authUser : null,
    places:[],
    library:['places'],



    signin: (credentialResponse) =>{
        const result = jwtDecode(credentialResponse.credential);
        console.log("User sign in successfull :" ,result);
        set({authUser: result});
        localStorage.setItem('authUser', JSON.stringify(result));
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