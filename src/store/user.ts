// initial state
import { UserControllerService } from "../../generated";
import Access_Enum from "@/access/accessEnum";

const state = () => ({
  loginUser: {
    id: "",
    userName: "未登录",
    userRole: "notLogin",
    userAvatar: "",
    userGender: "",
    userProfile: "",
    userEmail: "",
    userPhone: "",
    createTime: "",
  },
});

const getters = {
  getUserInfo(state: { loginUser: any }) {
    console.log(state.loginUser);
    return state.loginUser;
  },
};

const mutations = {
  setUserInfo(state: { loginUser: any }, payload: any) {
    state.loginUser = payload;
  },
};

const actions = {
  async getLoginUser({ commit, state }: any) {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      commit("setUserInfo", res.data);
    } else {
      // message.error(res.message as string);
    }
    commit("setUserInfo", {
      ...state.loginUser,
      UserRole: Access_Enum.NOT_LOGIN,
    });
  },

  async userLoginOut({ commit, state }: any) {
    const res = await UserControllerService.userLogoutUsingPost();
    if (res.code === 0) {
      localStorage.removeItem("xToken");
      commit("setUserInfo", {
        ...state.loginUser,
        UserRole: Access_Enum.NOT_LOGIN,
      });
    } else {
      // 处理登出失败的情况，例如显示错误消息
      console.error("登出失败:", res.message);
    }
  },

  changeAvatar({ commit, state }: any, payload: any) {
    commit("setUserInfo", {
      ...state.loginUser,
      userAvatar: payload,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
