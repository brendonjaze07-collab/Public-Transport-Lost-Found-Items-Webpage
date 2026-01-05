const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

(async ()=>{
  const p = new PrismaClient();
  const u = await p.user.findUnique({ where: { email: 'admin@transport.com' } });
  console.log('stored hash:', u.password);
  const ok = await bcrypt.compare('admin123', u.password);
  console.log('compare with admin123 ->', ok);
  await p.$disconnect();
})();