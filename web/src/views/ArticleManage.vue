<template>
    <div>
        <h1 class="text-primary">我的文章</h1>
        <el-table :data="items">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="author.username" label="作者"></el-table-column>
            <el-table-column prop="createdAt" label="日期"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="$router.push(`/write-article/${scope.row._id}`)"
                    >编辑</el-button>
                    <el-button type="warning" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        async fetch() {
            // const res = await this.$http.get("rest/article");
            // let moment= require('moment') ;
            // res.data.forEach(element => {
            //     element.date = moment(element.date).format('M[月]D[日]')
            // });
            const res = await this.$http.get("/articles");
            this.items = res.data;
        },
        async remove(row) {
            this.$confirm(`是否继续删除 "${row.title}"`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await this.$http.delete(`rest/article/${row._id}`);
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.fetch();
                })
                .catch(err => {
                    this.$message({
                        type: "success",
                        message: err
                    });
                });
        }
    },
    created() {
        this.fetch();
    }
};
</script>
