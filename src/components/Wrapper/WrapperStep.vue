<template>
  <!-- 包装器-步骤条 -->
  <div class="common-wrapper-step">
    <!-- 步骤条 -->
    <el-steps :active="active" simple>
      <el-step v-for="(item, key) in stepData" :key="key">
        <div slot="title">{{item.title}}</div>
      </el-step>
    </el-steps>
    <!-- 内容 -->
    <template v-for="(item, key) in stepData" class="step-content">
      <slot :key="key" v-if="active === item.step" :name="item.slot"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CommonWrapperStep',
  props: {
    // 当前激活步骤
    active: { type: Number, default: 0 },
    // 步骤数据
    stepData: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.common-wrapper-step {
  height: 100%;
  .step-content {
    height: calc(100% - 46px);
  }
}
</style>

<style lang="scss">
.common-wrapper-step {
  .el-step__head {
    display: none;
  }
}
</style>