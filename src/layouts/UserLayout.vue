<template>
  <div id="userlayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/OJ-logo.jpg" class="logo" />
          <div>小徐 OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.arco.design/" target="_blank">Arco Design Vue</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#userlayout {
  text-align: center;
  background: url("../assets/bg.png") 0% 0% / 100% 100%;
}

#userlayout .logo {
  width: 64px;
  height: 64px;
}

#userlayout .header {
  margin-top: 16px;
  margin-bottom: 16px;
}

#userlayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userlayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts"></script>
