<template>
    <div>
        <h1 class="text-primary">热门文章</h1>
        <m-article-list
            :articles="articles"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        ></m-article-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articles: [],
            loading: true
        };
    },
    methods: {
        async fetchArticles() {
            const res = await this.$http
                .get("/rest/article")
                .then(res => {
                    this.loading = false;

                    this.articles = res.data;
                })
                .catch(err => {
                    this.loading = false;
                });
            // res.data.map(article => {
            //     article.oneline = article.body.replace(/<[^>]+>/g,"");
            //     return article;
            // });
        }
    },
    created() {
        this.fetchArticles();
    }
};
</script>
