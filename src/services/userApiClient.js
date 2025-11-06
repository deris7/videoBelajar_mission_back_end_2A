import axiosClient from "./api"; // pastikan axiosClient sudah set baseURL ke MockAPI

const userService = {
  register: (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      avatar: data.avatar || "/images/profile.png", // default avatar
      createdAt: new Date().toISOString(),
    };
    return axiosClient.post("/users", payload);
  },

  login: async (email, password) => {
    const res = await axiosClient.get("/users");
    const user = res.data.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Email atau password salah!");
    return user;
  },

  getUsers: () => axiosClient.get("/users"),
  getUserById: (id) => axiosClient.get(`/users/${id}`),

  updateUser: (id, data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      avatar: data.avatar || "/images/profile.png", // update avatar juga
    };
    return axiosClient.put(`/users/${id}`, payload);
  },

  deleteUser: (id) => axiosClient.delete(`/users/${id}`),
};

export default userService;
