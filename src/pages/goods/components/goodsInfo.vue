<template>
  <!-- <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expandTrigger='hover'
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
  </el-form-item> -->
  <CommonWrapperFormItem :formItem="items" ></CommonWrapperFormItem>
</template>

<script>
import WrapperFormItem from '../../../components/Wrapper/WrapperFormItem'
export default {
  name:'liu-GoodsInfo',
    components: {
        "CommonWrapperFormItem": WrapperFormItem
    },
    data: () => {
        return {
            items: [
                { type: 'input', label: '名称1', key: 'key1' },
                { type: 'select', label: '名称2', key: 'key2', dictionary: 'SJZD' },
                { type: 'daterange', label: '名称3', key: 'key3' }
            ]
        }
    }
}
</script>

<style>
</style>