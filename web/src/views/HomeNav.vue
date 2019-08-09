<template>
    <div class="m-3">
        <div>
            <div class="nav d-flex ai-center pt-5 pb-3 fs-xl border-bottom">
                <img class="logo mr-3" src="../assets/logo.png" alt />
                <div
                    class="nav-item mr-5"
                    v-for="(item, index) in nav"
                    @click="routerLink(index, item.path)"
                    :key="index"
                >
                    <!-- 判断高亮表 -->
                    <a
                        class="text-grey-1"
                        :class="navIndex === index ? 'active' : 'item-cn'"
                    >{{ item.title }}</a>
                    <!-- 判断高亮表 -->
                </div>
                <div class="flex-1"></div>
                <div class="fs-lg">
                    <span>Hello,</span>
                    <span>
                        <a
                            href
                            @click="logout"
                            class="text-primary"
                            style="font-weight:bold"
                        >{{model.username}}</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {},
            nav: [
                { title: "首页", path: "/" },
                { title: "写文章", path: "/write-article" },
                { title: "管理我的文章", path: "/manage-articles" }
            ],
            navIndex: 0
        };
    },
    methods: {
        async getUserInfo() {
            const res = await this.$http.get("/userinfo");
            this.$set(this, "model", res.data);
        },
        logout() {
            this.$router.push('/login')
            localStorage.removeItem("token");

        },
        /**
         * 路由跳转
         * @param index
         * @param link
         */
        routerLink(index, path) {
            // 点击哪个路由就赋值给自定义的下下标
            this.navIndex = index;
            // 路由跳转
            this.$router.push(path);
        },

        /**
         * 检索当前路径
         * @param path
         */
        checkRouterLocal(path) {
            // 查找当前路由下标高亮
            this.navIndex = this.nav.findIndex(item => item.path === path);
        }
    },
    created() {
        this.getUserInfo();
        
        // 获取当前路径
        let path = this.$route.path;
        // 检索当前路径
        this.checkRouterLocal(path);
    },
    watch: {
        $route() {
            // 获取当前路径
            let path = this.$route.path;
            // 检索当前路径
            this.checkRouterLocal(path);
        }
    }
};
</script>
<style lang="scss">
.logo {
    height: 1.5em;
    width: auto;
}
</style>



