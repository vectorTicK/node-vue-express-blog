<template>
      <div class="register-container">
        <el-card header="请先注册" class="register-card">
            <el-form @submit.native.prevent="register">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="model.comfirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async register() {
            await this.$http.post('register', this.model)
            this.$router.push('/login')
            this.$message({
                type: 'success',
                message: '注册成功，请登录'
            })
        }
    }
};
</script>

<style>
.register-card {
    width: 25rem;
    margin: 5rem auto;
}
</style>