<template>

    <div>
        <div>
            主页
            <button type="button" class="btn btn btn-danger" @click = "testDispatch">testDispatch</button>
            {{userInfo}}
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return {
                data:''
            }
        },
        computed:{
            ...mapGetters(["userInfo"]),
        },
        created(){
            //外部 view 层调用 vux （数据层）
            // 调用state
            console.log(this.$store.state.table.tableData[0].birthday);
            //提交 请求动作，
            this.$store.dispatch('UPDATEUSERINFO','mainuser');
        },
        methods:{
            testDispatch(){
                this.$store.dispatch('UPDATEUSERINFO','mainuser');
                var data = this.$store.getters.userInfo;
            console.log(data);
            },
        },
        updated(){
            var data = this.$store.getters('userInfon');
            cosole.log(data);
            // this.data = this.$store
        },
        // computed:mapGetters([
        // 'count',
        // 'getOdd'
        // ]),
        // methods:mapActions([
        // 'increment',
        // 'decrement',
        // 'clickOdd',
        // 'clickAsync'
        // ])
    }
</script>