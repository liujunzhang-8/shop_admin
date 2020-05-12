@ Title 说明文档  
@ Version 1.0  
@ LastModified 2018-12-27 
@ author WangYD

---

# WrapperOperation 列表操作
> 列表的操作区主要是 **按钮操作** 和 **搜索操作** 。  
按钮操作：通过提供的插槽，添加自定义内容。  
搜索操作：通过配置搜索项的参数，动态生成 **主要搜索** 和 **高级搜索** 。

## Props 传入参数

参数 | 说明 | 类型 | 默认值
---|---|:--:|:--:|
configSearchItem | 搜索项配置 |	Array	|	[ ]
dictionarys | 数据字典 | Object |{ }

```
// 搜索项配置
configSearchItem: [
  { type: 'input', label: '名称1', key: 'key1' },
  { type: 'select', label: '名称2', key: 'key2', dictionary: 'SJZD' },
  { type: 'daterange', label: '名称3', key: 'key3' }
]
```
```
// 数据字典
dictionarys: { SJZD: { ... } }
```

> ## configSearchItem 搜索项配置
> **支持类型：input / select / select-multiple / date / daterange**
>
>| 参数 | 说明 | 类型 | 可选值 | 默认值
>| ---|---|:--:|:--:|:--:|
>| type | 必填，类型 | String | input<br>select / select-multiple<br>date / daterange | — 
>| label | 必填，标题名称 | String | — | — 
>| key | 必填，字段名称 | String | — | — 
>| value | 可选，默认值 | — | — | Null / [ ]
>| size | 可选，尺寸 | String | common / medium | common
>| placeholder | 可选，提示信息 | String	| — | 请输入 / 请选择<br> + label 标题名称
>
>> ### input 输入框  
>>
>> - 返回值：String
>>
>> - 可选参数：暂无
> ---
>> ### select 选择器  
>>
>> - 返回值：String  
>>
>> - 可选参数：
>>
>> | 参数 | 说明 | 类型 | 默认值
>> | ---|---|:--:|:--:|
>> | options | 可选，选项 | Array | [ ]
>> | dictionary | 可选，数据字典<br>自动转换为 options 选项 | String	| —
>>
>> ```
>> options: [
>>    { label: '选项1', value: '值' },
>>    ...
>> ]
>> ```
> ---
>> ### select-multiple 选择器-多选  
>>
>> - 返回值：Array  
>>
>> - 可选参数：同 select 选择器
> ---
>> ### date 日期选择器
>>
>> - 返回值：String（yyyy-MM-dd）
>>
>> - 可选参数：
>>
>> | 参数 | 说明 | 类型 | 默认值
>> |---|---|:--:|:--:|
>> | configs | 可选，配置项 | Object | —
>>
>> ```
>> // 配置项
>> configs: {
>>   // 开始日期（Date 对象可识别格式），禁选小于 startDate 的日期
>>   startDate: '2018-1-1' ,
>>   // 结束日期（Date 对象可识别格式），禁选大于 endDate 的日期
>>   endDate: new Date() ,
>>   // 快捷选项：是否启用（Boolean），date 默认关闭，daterange 默认启用
>>   sginShortcuts: true ,
>>   // 快捷选项：自定义配置(Array)，具体配置方法可以看源码
>>   customShortcuts: []
>> }
>> ```
> ---
>> ### daterange 日期选择器-范围
>>
>> - 返回值：Array（[ yyyy-MM-dd HH:mm:ss , yyyy-MM-dd HH:mm:ss ]）
>>
>> - 可选参数：
>>
>> | 参数 | 说明 | 类型 | 默认值
>> |---|---|:--:|:--:|
>> | valueFormat | 可选，绑定值格式 | String | yyyy-MM-dd HH:mm:ss
>> | configs | 可选，配置项 | Object | —
>>
>> ```
>> // 配置项
>> configs: {
>>   // 同 date 日期选择器
>> }
>> ```
> ---

## Events 自定义事件

事件名称 | 说明 | 返回值
---|---|:--:|
handleSearchRequest | 查询请求，返回查询参数 | params

```
params: {
  key1: '',
  key2: '',
  key3: [],
}
```

## Slots 插槽

name | 说明
---|---|
custom | 自定义操作（按钮操作）

---