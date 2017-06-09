<template>
    <!--常用表单元素样式-->
    <!--通用导航条 -->
    <div>
        <v-breadcrumb :breadcrumbData="toBreadcrumb"></v-breadcrumb>
        <div class="col-md-12">
            <div class="smart-widget widget-purple">
                <div class="smart-widget-header">
                    添加消息
                </div>
                <div class="smart-widget-inner">
                    <div class="smart-widget-body">
                        <!--为表单添加验证过滤-->
                        <form class="form-horizontal no-margin" @submit.prevent="validateBeforeSubmit">
                            <div class="form-group">
                                <label class="control-label col-lg-2">email</label>
                                <div :class="{'col-lg-6': true, 'has-error': errors.has('email') }">
                                    <i class="fa fa-envelope-o icon-absolute-left"></i>
                                    <i class="fa fa-envelope-o icon-absolute-right"></i>
                                    <input autocomplete="false" type="nonvoid" class="form-control input-sm" placeholder="非空的 email" name="email" v-model="email" v-validate="'required|email'">
                                    <!--错误提示信息-->
                                    <v-errorMsg 
                                    :errorMsgAlert="{'isShow':errors.has('email'),'msg':[{'isShow':errors.has('email:required'),'msg':errors.first('email:required')},{'isShow':errors.has('email:email'),'msg':errors.first('email:email')}]}">
                                    </v-errorMsg>
                                </div>
                            </div>
                            <!-- /form-group -->
                            <div class="form-group">
                                <label class="col-lg-2 control-label">水平 单选框</label>
                                <div class="col-lg-10">
                                    <div class="radio inline-block">
                                        <div class="custom-radio m-right-xs">
                                            <input type="radio" id="inlineRadio1" value="1" v-model="inlineRadio" name="inlineRadio" v-validate="'required|in:1,2'">
                                            <label for="inlineRadio1"></label>
                                        </div>
                                        <div class="inline-block vertical-top">单选框 1</div>
                                    </div>
                                    <div class="radio inline-block">
                                        <div class="custom-radio m-right-xs">
                                            <input type="radio" id="inlineRadio2" name="inlineRadio" value="2" v-model="inlineRadio">
                                            <label for="inlineRadio2"></label>
                                        </div>
                                        <div class="inline-block vertical-top">单选框 2 {{inlineRadio}}</div>
                                    </div>
                                    
                                    <v-errorMsg 
                                    :errorMsgAlert="{'isShow':errors.has('inlineRadio'),'msg':[{'isShow':errors.has('inlineRadio'),'msg':errors.first('inlineRadio:required')}]}">
                                    </v-errorMsg>
                                </div>
                                <!-- /.col -->
                            </div>
                            
                            <!-- /form-group -->
                            <!--自定义规则 通过写入正则-->
                            <div class="form-group">
                                <label class="control-label col-lg-2">自定规则过滤手机号</label>
                                <div :class="{'col-lg-6': true, 'has-error': (errors.has('userTel:required')|errors.has('userTel:regex'))}">
                                    <input v-validate="'required|regex:^[1][358][0-9]{9}$'" type="text" class="form-control input-sm" placeholder="手机号" name="userTel" v-model="userTel">
                                    
                                    <v-errorMsg 
                                    :errorMsgAlert="{'isShow':errors.has('userTel'),'msg':[{'isShow':errors.has('userTel:required'),'msg':errors.first('userTel:required')},{'isShow':errors.has('userTel:regex'),'msg':errors.first('userTel:regex')}]}">
                                    </v-errorMsg>
                                </div>
                                <!-- /.col -->
                            </div>

                            <!-- /form-group -->
                            <div class="form-group">
                                <div class="text-center m-top-md col-lg-9">
                                    <button type="submit" class="btn btn-info">提交</button>
                                    <button type="reset" class="btn btn-danger">重置</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <!-- ./smart-widget-inner -->
            </div>
            <!-- ./smart-widget -->
        </div>
    </div>
</template>

<script>
    import breadcrumb from '../components/common/breadcrumb.vue'
    import errorMsg from '../components/common/formError.vue'
    export default {
        data() {
            return {
                // 初始化导航栏数据
                toBreadcrumb: [
                    { path: 'main', name: '主页' },
                    { path: 'formElement', name: 'formElement构建' },
                ],
                Password: "",
                checkPassword: "",
                // validate 定义
                email: '',
                inlineRadio: '',
                inlineCheckbox:[],
                userTel:"",
                rangeLength:"",
                minVal:"",
                rangeNum:"",
                maxVal:"",
                userPwd:"",
                confirmPwd:"",
                name: '',
                phone: '',
                url: ''
            }
        },
        components: {
            'v-breadcrumb': breadcrumb,
            'v-errorMsg': errorMsg
        },
        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then(() => {
                    // eslint-disable-next-line
                    alert('ok');
                }).catch(() => {
                    // eslint-disable-next-line
                    alert('未通过');
                });
            }
        }
    }

</script>