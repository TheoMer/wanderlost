import { Context, ItemInput } from '../../types'

export async function updateItem(_: any, args: ItemInput, { prisma }: Context) {
  // first take a copy of the updates
  const updates = { ...args }
  // remove the ID from the updates
  // TODO: fix delete operand must be optional error
  // delete updates.id
  // run the update method
  return prisma.item.update({
    data: updates,
    where: { id: args.id },
  })
}
