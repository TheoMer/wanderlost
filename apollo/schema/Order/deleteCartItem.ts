export async function deleteCartItem(_, { id }, { req, prisma }) {
  const cartItem = await prisma.cartItem.findOne({ where: { id } })
  if (!cartItem) throw new Error('No CartItem found!')
  if (cartItem.userId !== req.userId) throw new Error('The item must be in your own cart')
  const deleted = await prisma.cartItem.delete({ where: { id } })
  return deleted
}
