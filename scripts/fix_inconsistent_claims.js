const { PrismaClient } = require('@prisma/client');

async function main() {
  const p = new PrismaClient();

  // Find claims that are PENDING but the associated item is already CLAIMED
  const mismatched = await p.claimRequest.findMany({
    where: { status: 'PENDING' },
    include: { item: true },
  });

  const toFix = mismatched.filter(c => c.item && c.item.status === 'CLAIMED');

  console.log('Found mismatched pending claims where item already CLAIMED:', toFix.length);

  for (const c of toFix) {
    console.log('Approving claim:', c.id, 'for item:', c.itemId);
    await p.claimRequest.update({ where: { id: c.id }, data: { status: 'APPROVED' } });
  }

  const pendingAfter = await p.claimRequest.count({ where: { status: 'PENDING' } });
  console.log('Pending claims remaining:', pendingAfter);

  await p.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});