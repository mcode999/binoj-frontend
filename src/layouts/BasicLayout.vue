<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <div id="basicLayout">
    <t-layout style="height: 400px">
      <t-header class="header">
        <global-header />
      </t-header>
      <t-content class="content"> <router-view /></t-content>
      <t-footer class="footer">
        <a href="www.rsbin.top" target="_blank">RsBin的OJ判题系统项目</a>
      </t-footer>
    </t-layout>
  </div>
</template>

<style scoped>
#basicLayout {
  padding: 0;
  margin: 0;
}
#basicLayout .header {
  height: 60px;
}

#basicLayout .content {
  background: radial-gradient(
      ellipse farthest-side at 76% 77%,
      rgba(245, 228, 212, 0.25) 4%,
      rgba(255, 255, 255, 0) calc(4% + 1px)
    ),
    radial-gradient(circle at 76% 40%, #fef6ec 4%, rgba(255, 255, 255, 0) 4.18%),
    linear-gradient(135deg, #ff0000 0%, #000036 100%),
    radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%),
    linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%);
  background-blend-mode: normal, normal, screen, overlay, normal;
}

#basicLayout .footer {
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: #c4fcef;
}
</style>
