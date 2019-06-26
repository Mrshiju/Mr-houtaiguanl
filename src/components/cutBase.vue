<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{list1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{list2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name:'my-list',
    props:['list1','list2']
}
</script>

<style>

</style>
