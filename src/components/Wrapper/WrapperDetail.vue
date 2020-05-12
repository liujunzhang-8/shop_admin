<template>
  <!-- 包装器-详情页面 -->
  <div class="app-main-content">
    <!-- 页头 -->
    <div v-if="title" class="page-title">{{title}}</div>
    <!-- 内容 -->
    <slot name="content"></slot>
    <!-- 页尾 -->
    <div v-if="goBack" class="page-footer">
      <!-- <button-page-close :toRouteName="goBack" /> -->
    </div>
  </div>
</template>

<script>
// components
import ButtonPageClose from '@/components/common/Button/ButtonPageClose';

export default {
  name: 'CommonWrapperDetail',
  components: { ButtonPageClose },
  props: {
    // 页头 标题
    title: { type: String, default: '' },
    // 返回页面
    goBack: { type: String, default: '' },
  },
}
</script>