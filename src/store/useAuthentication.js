import { create } from "zustand";
const initialVal = {
  email: "",
  name: "",
  id: "",
  avatar: 0,
  isLogin: false,
};
export const useAuthentication = create((set) => ({
  user: { ...initialVal },
  login: (user) => {
    const newUser = {
      email: user.email,
      name: user.name,
      id: user.id,
      role: user.role,
      avatar: user.avatar,
      isLogin: true,
    };
    set(() => ({ user: { ...newUser } }));
    localStorage.setItem("bookory-user", JSON.stringify(newUser));
  },
  changeInfo: (info) => {
    set((state) => ({
      user: {
        name: info.name,
        avatar: info.avatar,
        email: state.user.email,
        id: state.user.id,
        role: state.user.role,
        isLogin: true,
      },
    }));
  },
  logout: () => {
    set(() => ({ user: { ...initialVal } }));
    localStorage.setItem("bookory-user", JSON.stringify(initialVal));
  },
}));
