<template>
  <div id="basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
#basiclayout {
}

#basiclayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basiclayout .content {
  background: url("../assets/bg.png") 0% 0% / 100% 100%;
  margin-bottom: 16px;
  padding: 20px;
}

#basiclayout .footer {
  //background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
