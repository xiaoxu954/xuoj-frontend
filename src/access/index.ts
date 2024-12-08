import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import { computed } from "vue";
import { useStore } from "vuex";

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  const loginUser = computed(() => store.state.user.loginUser);

  // console.log("登陆用户信息", loginUser.value.userRole);
  // 获取后端的token

  // console.log("user_login", localStorage.getItem("user_login"));
  //如果用户不存在
  if (!loginUser.value || loginUser.value.userRole === ACCESS_ENUM.NOT_LOGIN) {
    //同步等待用户登录成功
    await store.dispatch("user/getLoginUser");
  }
  //根据路由中的meta信息进行判断，如果没有access属性那么就表示该页面无需登录
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //表明该页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果用户未登录
    if (
      !loginUser.value ||
      loginUser.value.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      store.state.visible = true;
      next(false);
    }
    //如果已经登录但是权限不足
    if (!checkAccess(loginUser.value, needAccess)) {
      next("/noAuth");
    }
  }
  next();
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser.value ||
      !loginUser.value.userRole ||
      loginUser.value.use === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
