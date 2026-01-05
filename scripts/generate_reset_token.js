const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

async function main(){
  const prisma = new PrismaClient();
  const email = 'admin@transport.com';
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) { console.error('No user'); return }
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000*60*60);
  await prisma.user.update({ where: { email }, data: { resetToken: token, resetTokenExpires: expires } });
  console.log('Reset token:', token);
  console.log('Reset URL:', `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login/reset/${token}`);
  await prisma.$disconnect();
}
main().catch(e=>{console.error(e);process.exit(1)});
