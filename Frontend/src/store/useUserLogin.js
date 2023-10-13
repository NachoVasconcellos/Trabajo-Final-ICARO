// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// const useUserLogin = create(
//   persist(
//     (set) => ({
//       isLogged: false,
//       user: {
//       },
//       // isAdmin: false,
//       setIsLogged: (isLogged) => set(() => ({ isLogged: isLogged })),
//       setUser: (user) =>
//         set(() => ({
//           user: {
//             // data: {
//             //   ...state.user.data,
//             //   Id: user.data.id,
//             //   Name: user.data.Name,
//             //   Surname: user.data.Surname,
//             //   Email: user.data.Email,
//             //   Address: user.data.Address,
//             //   Telephone: user.data.Telephone,
//             //   isAdmin: user.data.isAdmin,
//             // },
//           },
//         })),
//     }),
//       // setUser: (user) => set((state) => ({ user: {...user.data} })),
//       // setIsAdmin: (isAdmin) => set(() => ({ isAdmin: isAdmin })),
    
//     {
//       name: "user-login-storage",
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );
// export default useUserLogin;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useUserLogin = create(
  persist(
    (set) => ({
      isLogged: false, //null
      user: {}, //inicial
      setIsLogged: (isLogged) => set(() => ({ isLogged: isLogged })),
      setUser: (user) =>
        set(() => ({
          user: user.data,
        })),
    }),
    {
      name: "user-login-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useUserLogin;