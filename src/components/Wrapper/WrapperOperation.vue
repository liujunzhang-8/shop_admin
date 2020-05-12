<template>
  <!-- 包装器-列表操作 -->
  <div class="common-wrapper-operation">
    <!-- 基本操作区 -->
    <div class="operation-area">
      <!-- 自定义操作 -->
      <div class="operation-custom">
        <slot name="custom"></slot>
      </div>
      <!-- 搜索框 主要搜索 -->
      <div class="search-main" v-if="!showSearchAll && showSearchMain">
        <template v-if="searchItems.length > 0">
          <el-input v-if="searchMain.type === 'input'" v-model="searchDataCurrent[searchMain.prop]" clearable :placeholder="searchMain.placeholder" @keyup.enter.native="handleSearchRequest()">
            <el-button slot="append" icon="el-icon-search" @click="handleSearchRequest()"></el-button>
          </el-input>
        </template>
      </div>
      <!-- 高级搜索 切换按钮 -->
      <el-button v-if="!showSearchAll && searchItems.length > 1" class="button-search-more" @click="showSearchMore = !showSearchMore">
        <span>高级搜索</span>
        <i :class="['el-icon--right', showSearchMore ? 'el-icon-arrow-up': 'el-icon-arrow-down']"></i>
      </el-button>
    </div>
    <!-- 高级搜索 隐藏/显示 -->
    <el-collapse-transition>
      <div v-show="showSearchAll || showSearchMore">
        <!-- 搜索表单 -->
        <el-form ref="form" :model="searchDataCurrent" :rules="searchRules" label-position="right" label-width="130px">
          <wrapper-form-item v-if="searchItems" :formItem="searchItems" :formData.sync="searchDataCurrent">
            <!-- 自定义 -->
            <template v-for="(item, key) in searchItems" :slot="item.slot">
              <slot v-if="item.slot" v-key="key" :name="item.slot" :data="item"></slot>
            </template>
          </wrapper-form-item>
          <!-- 搜索操作 -->
          <el-form-item>
            <el-button type="primary" @click="handleSearchRequest()">搜索</el-button>
            <el-button type="info" plain @click="resetSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'CommonWrapperOperation',
  props: {
    // 搜索数据
    searchData: { type: Object, default: () => ({}) },
    // 搜索验证
    searchRules: { type: Object, default: null },
    // 搜索项
    searchItems: { type: Array, default: () => [] },
    // 显示全部搜索项
    showSearchAll: { type: Boolean, default: false },
    // 显示主搜索
    showSearchMain: { type: Boolean, default: true },
    // 重置-搜索内容-更多操作
    resetSearchMore: { type: Function, default: null },
  },
  data() {
    return {
      // 高级搜索-隐藏/显示
      showSearchMore: false,
    };
  },
  computed: {
    // 当前搜索数据
    searchDataCurrent: {
      get() {
        return this.searchData;
      },
      set(newValue) {
        this.$emit('update:searchData', newValue);
      }
    },
    // 主要搜索
    searchMain() {
      let res = {};
      if (this.searchItems && this.searchItems.length > 0) {
        res = this.searchItems[0];
      }
      return res;
    },
  },
  methods: {
    // 重置-搜索内容
    resetSearch() {
      this.$refs.form.resetFields();
      // 重置-搜索内容-更多操作
      this.resetSearchMore && this.resetSearchMore();
    },
    // 处理-查询请求
    handleSearchRequest() {
      this.$nextTick(() => {
        if (this.searchRules) {
          this.$refs.form.validate((valid) => {
            valid && this.$emit('handleSearchRequest');
          });
        } else {
          this.$emit('handleSearchRequest');
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
/* 列表 操作 */
.common-wrapper-operation {
  // 基本操作
  .operation-area {
    margin-bottom: 22px;
    display: flex;
    // 自定义操作
    .operation-custom {
      flex: 1;
      display: flex;
    }
    // 搜索框 主要搜索
    .search-main {
      width: 280px;
      min-width: 280px;
    }
    // 高级搜索-切换按钮
    .button-search-more {
      background: linear-gradient(to bottom, #fcfcfc, #ebecf0);
      color: #666666;
    }
    .button-search-more:hover {
      background: linear-gradient(to bottom, #ececec, #e2e3e7);
    }
    .button-search-more:active,
    .button-search-more:focus,
    .button-search-more:hover {
      border-color: #dcdfe6;
    }
    // 间距
    .search-main + .button-search-more {
      margin-left: 20px;
    }
  }
}
</style>