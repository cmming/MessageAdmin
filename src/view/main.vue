<template>
    <div>
        <div>
            主页
            <input type="text" v-model = 'vue_test_params'>
            <button type="button" class="btn btn btn-danger" @click = "UPDATEUSERINFO(vue_test_params)">testDispatch</button>
            {{userInfo}}
        </div>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'

  export default{
      data(){
          return {
              vue_test_params:'',
          }
      },
    //   获取数据 相当于将data放在 vuex中去初始化
    computed:mapGetters([
      'userInfo'
    ]),
    methods:{
            ...mapActions([
            'UPDATEUSERINFO'
            ])
        },
  }
</script>