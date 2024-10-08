import { Hono, Next } from 'hono'

const app = new Hono()

async function authMiddleware(c:any, next:Next){
  if(c.req.header('Authorization')){
    // Do validation
    next()
  }
  else{
    return c.json({error: "Unauthorized"}, 401)
  }
}
app.use(
  async(c,next)=>{
    console.log("Middleware 1");
    await next()
  }
)

app.post('/',authMiddleware, async(c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.query("param"));
  console.log(c.req.header("Authorization"));
  return c.json({hello:"World"});
})

export default app
