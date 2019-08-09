<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card text-primary fs-xl">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="d-flex jc-between">
                        <el-button class="btn" type="primary" native-type="submit">登录</el-button>
                        <a href="/register" class="text-primary fs-sm">没有账号?</a>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async login() {
            const res = await this.$http.post("login", this.model);
            if (!res) {
                this.$message({
                    type: "success",
                    message: "连不上服务器"
                });
            } else {
                localStorage.token = res.data.token;
                this.$router.push("/");
                this.$message({
                    type: "success",
                    message: "登录成功"
                });
            }
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.login-card {
    width: 25rem;
    margin: 5rem auto;
}
</style>

