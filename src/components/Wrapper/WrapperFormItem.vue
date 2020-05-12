<template>
  <!-- 包装器-表单项 -->
  <el-row class="common-wrapper-form-item" :gutter="20">
    <el-col v-for="(item, key) of formItem" :key="key" class="form-item-col" :xs="12" :sm="12" :md="item.span">
      <el-form-item class="form-item" :prop="item.prop" :label="isShowLabel ? item.label : ''" :label-width="labelWidth" :rules="item.itemRule">
        <!-- 表单容器 -->
        <div class="form-item-box">
          <!-- 表单内容 -->
          <div class="form-item-content">
            <!-- 单选框 -->
            <el-radio-group v-if="item.type === 'radio'" v-model="formDataCurrent[item.prop]" @change="handleChange($event, item)">
              <el-radio v-for="(option, index) in item.options" :key="index" :label="option.label">{{option.content}}</el-radio>
            </el-radio-group>
            <!-- 输入框 -->
            <el-input v-else-if="item.type === 'input'" v-model="formDataCurrent[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" clearable @blur="handleBlur(item)" @change="handleChange($event, item)"></el-input>
            <!-- 密码框  -->
            <el-input v-else-if="item.type === 'password'" v-model="formDataCurrent[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" clearable show-password autocomplete="new-password"></el-input>
            <!-- 文本域 -->
            <el-input v-else-if="item.type === 'textarea'" type="textarea" v-model="formDataCurrent[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" resize="none" :rows="item.textareaRows"></el-input>
            <!-- 选择器 -->
            <el-select v-else-if="item.type === 'select'" v-model="formDataCurrent[item.prop]" class="form-item-full" :placeholder="item.placeholder" :disabled="item.disabled" clearable @change="handleChange($event, item)">
              <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value">
              </el-option>
            </el-select>
            <!-- 选择器-多选 -->
            <el-select v-else-if="item.type === 'select-multiple'" v-model="formDataCurrent[item.prop]" class="form-item-full" :placeholder="item.placeholder" :disabled="item.disabled" multiple collapse-tags>
              <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value">
              </el-option>
            </el-select>
            <!-- 日期选择器(范围)/日期时间选择器(范围) -->
            <!-- <el-date-picker v-else-if="useDatePicker(item.type)" v-model="formDataCurrent[item.prop]" :type="item.type" clearable :editable="false" :disabled="item.disabled" :readonly="item.readonly" :value-format="item.valueFormat" :picker-options="item.pickerOptions" :class="{'form-item-full': !isRangePicker(item.type)}" :placeholder="item.placeholder" :start-placeholder="buildStartPlaceholder(item.type)" :end-placeholder="buildEndPlaceholder(item.type)" :range-separator="isRangePicker(item.type) ? '—' : ''" :unlink-panels="isRangePicker(item.type)" :default-time="isRangePicker(item.type) ? item.defaultTime : ''" @change="handleChange($event, item)">
            </el-date-picker> -->
            <!-- 自定义 -->
            <slot v-else-if="item.type === 'custom'" :name="item.slot" :data="item"></slot>
            <!-- 其他 -->
          </div>
          <!-- 后置内容 -->
          <slot v-if="item.slotAppend" :name="item.slotAppend" :data="item"></slot>
        </div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'CommonWrapperFormItem',
  props: {
    // 表单项
    formItem: { type: Array, default: () => [] },
    // 表单数据
    formData: { type: Object, default: () => ({}) },
    // 是否显示标签文本
    isShowLabel: { type: Boolean, default: true },
    // 标签宽度
    labelWidth: { type: String, default: '' },
  },
  data() {
    return {};
  },
  computed: {
    // 当前表单数据
    formDataCurrent: {
      get() {
        return this.formData;
      },
      set(newValue) {
        this.$emit('update:formData', newValue);
      },
    },
  },
  methods: {
    // 判断-使用时间日期选择器
    useDatePicker(type = '') {
      const menu = ['date', 'datetime', 'daterange', 'datetimerange'];
      return menu.some(item => item === type);
    },
    // 判断-范围选择器
    isRangePicker(type = '') {
      const menu = ['daterange', 'datetimerange'];
      return menu.some(item => item === type);
    },
    // 构建-开始占位内容
    buildStartPlaceholder(type = '') {
      const menu = {
        daterange: '开始日期',
        datetimerange: '开始时间',
      };
      return menu[type] || '';
    },
    // 构建-结束占位内容
    buildEndPlaceholder(type = '') {
      const menu = {
        daterange: '结束日期',
        datetimerange: '结束时间',
      };
      return menu[type] || '';
    },
    // 处理-失焦事件
    handleBlur(item) {
      const { fnEventBlur } = item;
      if (fnEventBlur) {
        fnEventBlur();
      }
    },
    // 处理-值改变事件
    handleChange(value, item) {
      const { fnEventChange } = item;
      if (fnEventChange) {
        fnEventChange(value);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.common-wrapper-form-item {
  .form-item-col {
    min-height: 60px;
    .form-item {
      width: 100%;
      .form-item-box {
        display: flex;
        .form-item-content {
          width: 0;
          flex: 1;
        }
      }
    }
  }
}
</style>
