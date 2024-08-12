<template>
  <div class="exampleView">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditor.vue"; // @ is an alias to /src

const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
};

const mdValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
};
</script>
