const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();

  const pending = await prisma.claimRequest.findMany({ where: { status: 'PENDING' } });
  console.log('Pending claims count:', pending.length);
  console.log(pending.map(c => ({ id: c.id, itemId: c.itemId, status: c.status })));

  if (pending.length > 0) {
    const target = pending[0];
    console.log('\nSimulating approving the claim by marking the item as CLAIMED...');

    await prisma.$transaction(async (tx) => {
      await tx.foundItem.update({ where: { id: target.itemId }, data: { status: 'CLAIMED' } });
      await tx.claimRequest.updateMany({ where: { itemId: target.itemId, status: 'PENDING' }, data: { status: 'APPROVED' } });
    });

    const updatedClaim = await prisma.claimRequest.findUnique({ where: { id: target.id } });
    const updatedItem = await prisma.foundItem.findUnique({ where: { id: target.itemId } });

    console.log('After update - claim:', { id: updatedClaim.id, status: updatedClaim.status });
    console.log('After update - item:', { id: updatedItem.id, status: updatedItem.status });

    const pendingAfter = await prisma.claimRequest.count({ where: { status: 'PENDING' } });
    console.log('Pending claims after:', pendingAfter);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});