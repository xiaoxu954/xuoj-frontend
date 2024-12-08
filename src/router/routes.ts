import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import QuestionsSubmissionsDetail from "@/views/question/QuestionsSubmissionsDetail.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: QuestionsView,
  },

  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },

  {
    path: "/question/add",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/update",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },

  {
    path: "/question/manage",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question_submit",
    name: "浏览题目提交页",
    component: QuestionsSubmitView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/question/view/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true, // 开启接收动态id
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/submissions/detail/:id",
    name: "提交详情",
    props: true,
    component: QuestionsSubmissionsDetail,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
      title: "提交详情",
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/info",
        name: "用户信息",
        component: UserInfoView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/introduce",
    name: "OJ介绍",
    component: () => import("../views/SystemIntroduceView.vue"),
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  //
  // {
  //   path: "/admin",
  //   name: "仅管理员 ",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
