<template>
    <div>
        <!--data:显示的数据-->
        <!--<v-model></v-model>-->
        <v-breadcrumb :breadcrumbData="toBreadcrumb"></v-breadcrumb>

    </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      return {
         // 初始化导航栏数据
        toBreadcrumb: [
            { path: 'main', name: '主页' },
            { path: 'menuConfig', name: '添加目录' },
        ],
      }
    },

    methods: {
     
    }
  };
</script>