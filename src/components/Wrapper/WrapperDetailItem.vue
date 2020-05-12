<template>
  <!-- 包装器-详情内容(表单) -->
  <el-row :gutter="20">
    <el-col v-for="(item, key) of detailItem" :key="key" :xs="12" :sm="12" :md="item.span">
      <el-form-item :label="item.label | filterFormItemLabel" :label-width="labelWidth">
        <!-- 文本 -->
        <div v-if="item.type === 'text'" class="form-item-text">{{detailData[item.prop]}}</div>
        <!-- 过滤器-日期 -->
        <div v-else-if="item.type === 'date'">
          {{detailData[item.prop] | filterFormatDate}}
        </div>
        <!-- 过滤器-日期时间 -->
        <div v-else-if="item.type === 'dateTime'">
          {{detailData[item.prop] | filterFormatDateTime}}
        </div>
        <!-- 数据字典 -->
        <div v-else-if="item.type === 'dictionary'">
          {{detailData[item.prop] | filterDictionary(item.dictionary)}}
        </div>
        <!-- 密码-显示/隐藏 -->
        <div v-else-if="item.type === 'password'" class="form-detail-password">
          <span>{{detailData[item.prop] | filterPassword(item.password)}}</span>
          <i :class="['el-icon-view', {'show': item.password}]" @click="item.password = !item.password"></i>
        </div>
        <!-- 自定义 -->
        <slot v-else-if="item.type === 'custom'" :name="item.slot" :data="item"></slot>
        <!-- 其他 -->
        <template v-else></template>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'CommonWrapperDetailItem',
  props: {
    // 详情项
    detailItem: { type: Array, default: () => [] },
    // 详情数据
    detailData: { type: Object, default: () => ({}) },
    // 标签宽度
    labelWidth: { type: String, default: '' },
  },
  filters: {
    // 标签文本
    filterFormItemLabel(value) {
      return `${value}：`;
    },
    // 密码
    filterPassword(value, flag) {
      return flag ? value : `●●●●●●`;
    },
  },
}
</script>

<style scoped>
/* 文本 */
.form-item-text {
  word-wrap: break-word;
}
/* 密码 显示/隐藏 */
.form-detail-password {
  display: flex;
  align-items: center;
}
.form-detail-password span {
  flex: 1;
}
.form-detail-password i {
  margin-right: 30px;
  cursor: pointer;
}
.form-detail-password i.show {
  color: #12c4ae;
}
</style>