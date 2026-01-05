const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main(){
  try{
    const prisma = new PrismaClient();
    const token = '082bbafe177d84871822e52a887afc8a1c331bbf97ac86f2910e26dea369321e';
    const password = 'newpassword123';
    const user = await prisma.user.findFirst({ where: { resetToken: token } });
    console.log('found user:', !!user, user && user.resetTokenExpires);
    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()){
      console.log('token invalid/expired');
      process.exit(1);
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed, resetToken: null, resetTokenExpires: null } });
    console.log('password reset successful');
    await prisma.$disconnect();
  }catch(e){
    console.error('do_reset error', e);
    process.exit(1);
  }
}

main();