import Vue from 'vue'
import Router from 'vue-router'
// 设置title脚本
import setTitle from '../util/setTitle/setTitle.js'

import axios from 'axios'

Vue.use(Router);

// 路由配置  this.$router.push('home')在js中设置路由跳转  this.$route.params
const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/manager',
        component: resolve => require(['../view/user.vue'], resolve),
        children: [
            {
            path: '/main',
            meta: { auth: true, title: "消息列表", },
            component: resolve => require(['../view/getMsg.vue'], resolve)
        },
        //实战

        {
            path: '/getMsg',
            meta: { auth: true, title: "消息列表", },
            component: resolve => require(['../view/getMsg.vue'], resolve)
        }, {
            path: '/updateMsg/:id',
            meta: { auth: true, title: "消息列表", },
            component: resolve => require(['../view/updateMsg.vue'], resolve)
        }, {
            path: '/getContacts',
            meta: { auth: true, title: "联系人列表", },
            component: resolve => require(['../view/getContacts.vue'], resolve)
        }, {
            path: '/updateContact',
            meta: { auth: true, title: "联系人列表", },
            component: resolve => require(['../view/updateContact.vue'], resolve)
        }, {
            path: '/addFile',
            meta: { auth: true, title: "联系人列表", },
            component: resolve => require(['../view/add_file.vue'], resolve)
        },{
            // 登陆后默认跳转的页面
            path: '/',
            redirect: '/main'
        },]
    },
    {
        path: '/login',
        meta: { auth: false, title: "登录" },
        component: resolve => require(['../view/signin.vue'], resolve)
    },
    {
        path: '/signup',
        meta: { auth: false, title: "注册" },
        component: resolve => require(['../view/signup.vue'], resolve)
    },
];

// 定义路由对象
const router = new Router({
    routes
})

// 路由登录验证 会有很多问题（用户可以篡改客户端的数据）->所以在最后要将 打包后的index.html  改为php 页面，一直验证session是否存在，如果不存在直接将 前端存储的登录状态清空（），同时跳转到登录页面
router.beforeEach(({ meta, path }, from, next) => {
    
    document.getElementsByTagName('title')[0].innerHTML = meta.title;
    window.scroll(0, 0);
    // 依据localStorage是否存在来判断用户是否登录
    // var { auth = true } = meta;
    var auth = meta.auth;
    var isLogin = localStorage.getItem('token') ? Boolean(localStorage.getItem('token')) : false;
    // auth 表示需要验证的页面 isLogin表示验证通过的数据session 
    if (auth && !isLogin) {
        return next({ path: '/login' })
        // 只要跳到登录页面就自动清除localStorage
    } else if (path === '/login') {
        //每次跳转之前 应该根据 缓存 进行 自动登录
        if(localStorage.getItem('token')){
            //发送 请求验证，如果 token 正确的话，就直接进行跳转到主页，而非登陆的页面
            axios.post(process.env.API_ROOT,{ 'type': "checkToken", 'dataform': JSON.stringify({})},{headers: {'x-access-token': localStorage.getItem("token")}}).then(function(data){
                if(data.data.code = 200){
                    return next({ path: '/main' })
                }else{
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_expired_at');
                }
            });
        }  
    }
    next()
});
router.afterEach(route => {
    // 依据localStorage是否存在来判断用户是否登录
    // console.log(route.meta.title);
    // 每次跳转后都修改页面的将页面的title转换
    // document.getElementsByTagName('title')[0].innerHTML=route.meta.title;
    // setTitle('修改title');
    // if(to.title){
    //     console.log(to.title);
    //     setTitle(to.title);
    // }
});



export default router