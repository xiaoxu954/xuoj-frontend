<template>
  <div>
    <a-row id="globalheader" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/OJ-logo.jpg" />
              <div class="title">XU OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-space size="large">
        <a-dropdown trigger="hover">
          <template
            v-if="loginUser && loginUser.userRole !== AccessEnum.NOT_LOGIN"
          >
            <template v-if="loginUser.userAvatar">
              <a-avatar shape="circle" :image-url="loginUser.userAvatar">
              </a-avatar>
            </template>
            <template v-else>
              <a-avatar shape="circle">
                <IconUser />
              </a-avatar>
            </template>
          </template>
          <template v-else>
            <!--            <a-avatar shape="circle" :style="{ backgroundColor: '#3370ff' }">-->
            <!--              <IconUser />-->
            <!--            </a-avatar>-->

            <div>
              <a-button type="primary" shape="round">登录/注册</a-button>
            </div>
          </template>
          <template #content>
            <template v-if="loginUser.userRole !== AccessEnum.NOT_LOGIN">
              <a-doption>
                <template #icon>
                  <icon-idcard />
                </template>
                <template #default>
                  <a-anchor-link href="/user/info">个人信息</a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-poweroff />
                </template>
                <template #default>
                  <a-anchor-link @click="logout">退出登录</a-anchor-link>
                </template>
              </a-doption>
            </template>
            <template v-else>
              <a-doption>
                <template #icon>
                  <icon-user />
                </template>
                <template #default>
                  <a-anchor-link href="/user/login">登录</a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-user />
                </template>
                <template #default>
                  <a-anchor-link href="/user/register">注册</a-anchor-link>
                </template>
              </a-doption>
            </template>
          </template>
        </a-dropdown>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import AccessEnum from "@/access/accessEnum";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();

const loginUser = store.state.user.loginUser;

//展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//默认主页
const selectKeys = ref(["/"]);

// 用户注销

const logout = async () => {
  await store.dispatch("user/userLoginOut", {});
  message.success("注销成功");
  location.reload();
};

//路由跳转时 更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    // userName: "xiaoxu",
    // userRole: AccessEnum.ADMIN,
    userName: loginUser.userName,
    userRole: loginUser.userRole,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
