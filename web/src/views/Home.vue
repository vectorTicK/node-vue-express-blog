<template>
    <el-container>
        <el-header>
            <div class="nav d-flex ai-center pt-5 pb-3 fs-xl border-bottom">
                <img class="logo mr-3" src="../assets/logo.png" alt />
                <div class="mr-5" :class="{active:(0===active)}" @click="active=0" >
                    <router-link to="/" >主页</router-link>
                </div>
                <div class="mr-5" :class="{active:(1===active)}" @click="active=1">
                    <router-link to="/write-article">写文章</router-link>
                </div>
                <div class="" :class="{active:(2===active)}" @click="active=2">
                    <router-link to="/manage-articles">管理文章</router-link>
                </div>
                <div class="flex-1">

                </div>
                <div class="fs-lg">
                    <span>Hello,</span>
                    <span ><a href="" @click="logout" class="text-primary" style="font-weight:bold">{{model.username}}</a></span>
                </div>
            </div>
        </el-header>
        <el-main class="mt-3">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
    
    data() {
        return {
            model: {},
            active: 0
        };
    },
    methods:{
        async getUserInfo(){
            const res =await this.$http.get('/userinfo')
            this.$set(this,"model", res.data);
        },
        logout(){
            localStorage.removeItem('token')
        }
    },
    created(){
        this.getUserInfo()
    }
};
</script>
<style lang="scss">
.logo {
    height: 1.5em;
    width: auto;
}
</style>



