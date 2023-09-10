<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue'
import CodeEditor from '@/components/CodeEditor.vue';
import { ref } from 'vue'

const content = ref('')
const onMdChange = (v: string) => {
  content.value = v
}

const code = ref('')
const onCodeChange = (v: string) => {
  code.value = v
}
</script>

<template>
  <div id="about">
    <MdEditor :value="content" :handle-change="onMdChange" />
    <CodeEditor :value="code" :handle-change="onCodeChange"/>
  </div>
</template>
<style scoped></style>
