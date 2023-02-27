const Tokens=require('csrf')
const tokens=new Tokens()
const secret=tokens.secretSync()
const token=tokens.create(secret)

console.log(token);

if(tokens.verify(secret,token)){
    console.log('verified');
}
