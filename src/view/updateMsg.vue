<template>
    <!--常用表单元素样式-->
    <!--通用导航条 -->
    <div>
        <v-breadcrumb :breadcrumbData="toBreadcrumb"></v-breadcrumb>
        <div class="col-md-12">
            <div class="smart-widget widget-purple">
                <div class="smart-widget-header">
                    发送消息
                </div>
                <div class="smart-widget-inner">
                    <div class="smart-widget-body">
                        <!--为表单添加验证过滤-->
                        <form class="form-horizontal no-margin" @submit.prevent="validateBeforeSubmit">

                            <div class="form-group" v-show = false>
                                <label class="control-label col-lg-2">系统编号</label>
                                <div class="col-lg-6">
                                    <select class="col-lg-6 form-control">
                                        <option value='1'>当前系统</option>
                                        <!--动态添加非本机以外的联系人-->
                                        <option value='2'>牌友圈</option>
                                        <option value='3'>view</option>
                                    </select>
                                </div>
                            </div>

                            <!-- /form-group -->
                            <div class="form-group">
                                <label class="control-label col-lg-2">联系人</label>
                                <div :class="{'col-lg-6': true, 'has-error': (errors.has('userTel:required')|errors.has('userTel:regex'))}">
                                    <!--<input disabled = true  type="text" class="form-control input-sm" placeholder="联系人,可以是手机号/邮箱" name="formdata.recvid" v-model="formdata.recvid">-->
                                    <span style="backgroundColor:#dfdfdf;padding:3px;borderRadius:3px;marginRight:10px;" v-for = '(item,key) in formdata.recvid '>{{item}}<span style= "position:relative;right:0;top:-7px;color:black;cursor:pointer" @click = "delRecvid(key)">×</span></span>
                                    
                                </div>
                                <!-- /.col -->
                            </div>
                            
                            <!-- /form-group -->
                            <div class="form-group">
                                <label class="col-lg-2 control-label">{{inlineRadio}}</label>
                                <div class="col-lg-10">
                                    <div class="row">
                                        
                                        <!--邮箱-->
                                        <div v-show ="inlineRadio == '邮箱'" :class="{'col-lg-6': true, 'has-error': errors.has('email')}">
                                            <i class="fa fa-envelope-o icon-absolute-left"></i>
                                            <!--<i v-show ="inlineRadio == '手机'" class="fa fa-mobile icon-absolute-left"></i>-->
                                            <input autocomplete="false" type="nonvoid" class="form-control input-sm" placeholder="非空的 email" name="email" v-model="email" v-validate="'required|email'">
                                            <!--错误提示信息-->
                                            <v-errorMsg 
                                            :errorMsgAlert="{'isShow':errors.has('email'),'msg':[{'isShow':errors.has('email:required'),'msg':errors.first('email:required')},{'isShow':errors.has('email:email'),'msg':errors.first('email:email')}]}">
                                            </v-errorMsg>
                                        </div>
                                        <!--手机-->
                                        <div v-show ="inlineRadio == '手机'" :class="{'col-lg-6': true, 'has-error': errors.has('email')}">
                                            <i class="fa fa-mobile icon-absolute-left"></i>
                                            <input v-validate="'required|regex:^[1][358][0-9]{9}$'" type="text" class="form-control input-sm" placeholder="手机号" name="userTel" v-model="userTel">
                                        
                                            <v-errorMsg 
                                            :errorMsgAlert="{'isShow':errors.has('userTel'),'msg':[{'isShow':errors.has('userTel:required'),'msg':errors.first('userTel:required')},{'isShow':errors.has('userTel:regex'),'msg':errors.first('userTel:regex')}]}">
                                            </v-errorMsg>
                                        </div>
                                        <!--选择联系人种类-->
                                        <div class="col-lg-6">
                                            <div class="radio inline-block">
                                                <div class="custom-radio m-right-xs">
                                                    <input type="radio" id="inlineRadio1" value="手机" v-model="inlineRadio" name="inlineRadio" v-validate="'required|in:手机,邮箱'">
                                                    <label for="inlineRadio1"></label>
                                                </div>
                                                <div class="inline-block vertical-top">手机</div>
                                            </div>
                                            <div class="radio inline-block">
                                                <div class="custom-radio m-right-xs">
                                                    <input type="radio" id="inlineRadio2" name="inlineRadio" value="邮箱" v-model="inlineRadio">
                                                    <label for="inlineRadio2"></label>
                                                </div>
                                                <div class="inline-block vertical-top">邮箱</div>
                                            </div>

                                            <button v-show="inlineRadio == '手机'&&!errors.has('userTel')" type="button" class="btn btn-sm btn-info" @click = "addContact">添加手机</button>
                                            <button v-show="inlineRadio == '邮箱'&&!errors.has('email')" type="button" class="btn btn-sm btn-info" @click = "addContact">添加邮箱</button>
                                            
                                            <v-errorMsg 
                                            :errorMsgAlert="{'isShow':errors.has('inlineRadio'),'msg':[{'isShow':errors.has('inlineRadio'),'msg':errors.first('inlineRadio:required')}]}">
                                            </v-errorMsg>
                                        </div>
                                </div> 
                               </div>
                                <!-- /.col -->
                            </div>      
                            <div class="form-group">
                                <label class="control-label col-lg-2">限制长度</label>
                                <div :class="{'col-lg-6': true, 'has-error': (errors.has('rangeLength:required')|errors.has('rangeLength:min')|errors.has('rangeLength:max'))}">
                                    <input name="rangeLength" v-validate="'required|min:5|max:10'" v-model="rangeLength" type="text" class="form-control input-sm" placeholder="长度 = [5,10]">
                                    
                                    <v-errorMsg 
                                    :errorMsgAlert="{'isShow':errors.has('rangeLength'),'msg':[{'isShow':errors.has('rangeLength:min'),'msg':errors.first('rangeLength:min')},{'isShow':errors.has('rangeLength:max'),'msg':errors.first('rangeLength:max')},{'isShow':errors.has('rangeLength:required'),'msg':errors.first('rangeLength:required')}]}">
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
                inlineRadio: '手机',
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
                url: '',

                formdata:{
                    "recvid":[], 
                },
            }
        },
        components: {
            'v-breadcrumb': breadcrumb,
            'v-errorMsg': errorMsg
        },
        methods: {
            //验证
            validateBeforeSubmit() {
                this.$validator.validateAll().then(() => {
                    // eslint-disable-next-line
                    alert('ok');
                }).catch(() => {
                    // eslint-disable-next-line
                    alert('未通过');
                });
            },
            //添加联系人
            addContact(){
                if(this.inlineRadio == "手机"){
                    this.formdata.recvid.push(this.userTel);
                }else if(this.inlineRadio=="邮箱"){
                    this.formdata.recvid.push(this.email);
                }
                // if(this.inlineRadio == "手机"){
                //     this.formdata.recvid += (this.userTel+"|");
                // }else if(this.inlineRadio=="邮箱"){
                //     this.formdata.recvid += (this.email+"|");
                // }
            },
            //删除联系人
            delRecvid(key){
                this.formdata.recvid.splice(key,1)
            }
        },
    }

</script>