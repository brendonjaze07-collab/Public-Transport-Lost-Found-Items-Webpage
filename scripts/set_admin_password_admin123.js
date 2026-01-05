const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

(async ()=>{
  const prisma = new PrismaClient();
  try{
    const email = 'admin@transport.com';
    const plaintext = 'admin123';
    const hashed = await bcrypt.hash(plaintext, 10);
    const updated = await prisma.user.update({ where: { email }, data: { password: hashed, resetToken: null, resetTokenExpires: null } });
    console.log('Updated admin:', { id: updated.id, email: updated.email, updatedAt: updated.updatedAt });
    await prisma.$disconnect();
  }catch(e){
    console.error('set_admin_password_admin123 error', e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();