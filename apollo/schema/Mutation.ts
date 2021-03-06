import { objectType, stringArg, intArg, idArg, arg } from '@nexus/schema'

import { createItem } from './Item/createItem'
import { updateItem } from './Item/updateItem'
import { deleteItem } from './Item/deleteItem'
import { signup } from './User/signup'
import { signin } from './User/signin'
import { signout } from './User/signout'
import { requestReset } from './User/requestReset'
import { resetPassword } from './User/resetPassword'
import { updatePermissions } from './User/updatePermissions'
import { addToCart } from './Order/addToCart'
import { deleteCartItem } from './Order/deleteCartItem'
import { checkout } from './Order/checkout'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createItem', {
      type: 'Item',
      args: {
        title: stringArg({ required: true }),
        description: stringArg({ required: true }),
        price: intArg({ required: true }),
        image: stringArg(),
        largeImage: stringArg(),
      },
      resolve: createItem,
    })

    t.field('updateItem', {
      type: 'Item',
      args: {
        id: idArg({ required: true }),
        title: stringArg(),
        description: stringArg(),
        price: intArg(),
      },
      resolve: updateItem,
    })

    t.field('deleteItem', {
      type: 'Item',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: deleteItem,
    })

    t.field('signup', {
      type: 'User',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      resolve: signup,
    })

    t.field('signin', {
      type: 'User',
      nullable: true,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: signin,
    })

    t.field('signout', {
      type: 'SuccessMessage',
      resolve: signout,
    })

    t.field('requestReset', {
      type: 'SuccessMessage',
      args: {
        email: stringArg({ required: true }),
      },
      resolve: requestReset,
    })

    t.field('resetPassword', {
      type: 'User',
      args: {
        resetToken: stringArg({ required: true }),
        password: stringArg({ required: true }),
        confirmPassword: stringArg({ required: true }),
      },
      resolve: resetPassword,
    })

    t.field('updatePermissions', {
      type: 'User',
      nullable: true,
      args: {
        permissions: arg({
          type: 'Permission',
          list: [false],
        }),
        userId: idArg({ required: true }),
      },
      resolve: updatePermissions,
    })

    t.field('addToCart', {
      type: 'CartItem',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: addToCart,
    })

    t.field('deleteCartItem', {
      type: 'CartItem',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: deleteCartItem,
    })

    t.field('checkout', {
      type: 'Order',
      args: {
        token: stringArg({ required: true }),
      },
      resolve: checkout,
    })
  },
})
