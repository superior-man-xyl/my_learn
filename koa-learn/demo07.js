//获得参数
const Koa=require('koa');
const Router=require('koa-router');

const app=new Koa();
const router=new Router();

router.get('/',function(ctx,next){
    ctx.body=ctx.query;
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('服务器已经在3000端口启动');
})