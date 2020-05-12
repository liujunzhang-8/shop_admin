<template>
  <!-- 包装器-列表 -->
  <div>
    <!-- 表格 -->
    <el-table ref="table" :data="tableData" border :height="height" :max-height="maxHeight" :show-summary="hasSummary" :summary-method="getSummaries" :row-key="rowKey" :lazy="Boolean(load)" :load="load" @sort-change="changeTableSort" @selection-change="$emit('changeTableSelection', $event)">
      <!-- 序号框 -->
      <el-table-column v-if="hasTableIndex" type="index" label="序号" width="120" align="center" fixed="left"></el-table-column>
      <!-- 多选框 -->
      <el-table-column v-if="hasTableSelection" type="selection" width="50" align="center" fixed="left"></el-table-column>
      <template v-for="(item,index) in configTableColumn">
        <!-- 文本 -->
        <el-table-column :key="index" v-if="item.type === 'text'" :prop="item.prop" :label="item.label" :sortable="item.sortable || false" :min-width="convertPixel(item.minWidth)" :align="buildAlign(item.align)" :header-align="buildAlign(item.headerAlign)"></el-table-column>
        <!-- 数据字典 -->
        <el-table-column :key="index" v-else-if="item.type === 'dictionary'" :label="item.label" :sortable="item.sortable || false" :min-width="convertPixel(item.minWidth)" :align="buildAlign(item.align)" :header-align="buildAlign(item.headerAlign)">
          <template slot-scope="scope">
            <span>{{scope.row[item.prop] | filterDictionary(item.dictionary)}}</span>
          </template>
        </el-table-column>
        <!-- 自定义-内容 -->
        <el-table-column :key="index" v-else-if="item.type === 'customContent'" :label="item.label" :sortable="item.sortable || false" :min-width="convertPixel(item.minWidth)" :align="buildAlign(item.align)" :header-align="buildAlign(item.headerAlign)">
          <template slot-scope="scope">
            <slot :name="item.slot" :data="item" :row="scope.row" :column="scope.column" :$index="scope.$index"></slot>
          </template>
        </el-table-column>
        <!-- 自定义 -->
        <slot v-else-if="item.type === 'custom'" :name="item.slot" :data="item"></slot>
        <!-- 其他 -->
        <template v-else></template>
      </template>
      <!-- 操作 -->
      <slot name="operation"></slot>
    </el-table>
    <!-- 分页 -->
    <!-- <table-pagination v-if="hasTablePager" :pager.sync="pager" @change="$emit('changeTablePagination', $event)" /> -->
  </div>
</template>

<script>
export default {
  name: 'CommonWrapperTable',
  props: {
    // 表格列配置
    configTableColumn: { type: Array, default: () => [] },
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格分页-显示
    hasTablePager: { type: Boolean, default: true },
    // 序号显示
    hasTableIndex: { type: Boolean, default: false },
    // 表格分页
    tablePager: { type: Object, default: () => ({ page: 1, size: 6, total: 0 }) },
    // 表格多选-显示
    hasTableSelection: { type: Boolean, default: true },
    // 表格固定高度
    height: { type: [String, Number, Object], default: null },
    // 表格最大高度
    maxHeight: { type: [String, Number, Object], default: null },
    // 行数据的Key
    rowKey: { type: [Function, String, Object], default: null },
    // 加载子节点数据的函数
    load: { type: [Function], default: null },
    // 最后一行显示合并
    hasSummary: { type: Boolean, default: false },
    getSummaries: { type: [Function], default: null },
  },
  computed: {
    // 分页
    pager: {
      get() {
        return this.tablePager;
      },
      set(newValue) {
        this.$emit('update:tablePager', newValue);
      },
    },
  },
  methods: {
    // 数值转换像素(px)
    convertPixel(num = 0) {
      const sign = num && Number.isInteger(num);
      return sign ? `${num}px` : 0;
    },
    // 构建-对齐方式
    buildAlign(value) {
      const menu = ['left', 'center', 'right'];
      return menu.some(item => item === value) ? value : menu[1];
    },
    // 表格对象
    objTable() {
      return this.$refs.table;
    },
    // 排序条件改变
    changeTableSort({ column, prop, order }) {
      const { sortProp = '' } = this.configTableColumn.find(v => v.prop === prop) || {};
      const sortType = { ascending: 'asc', descending: 'desc' };
      const res = prop ? `${sortProp || prop},${sortType[order]}` : null;
      this.$emit('changeTableSort', res);
    },
  },
};
</script>