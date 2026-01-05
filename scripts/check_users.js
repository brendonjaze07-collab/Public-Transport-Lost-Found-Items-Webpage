const { PrismaClient } = require('@prisma/client');

async function main(){
  const p = new PrismaClient();
  try{
    const users = await p.user.findMany();
    console.log('Users:', users);
  }catch(e){
    console.error(e);
  }finally{
    await p.$disconnect();
  }
}

main();
