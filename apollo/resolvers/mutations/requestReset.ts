import sgMail from '@sendgrid/mail'
import { promisify } from 'util'
import { randomBytes } from 'crypto'
import { Context } from '../../types'

export async function requestReset(_: any, { email }: { email: string }, { prisma }: Context) {
  const user = await prisma.user.findOne({ where: { email } })
  if (!user) {
    throw new Error(`No user found for email: ${email}'`)
  }
  const randomBytesPromiseified = promisify(randomBytes)
  const resetToken = (await randomBytesPromiseified(20)).toString('hex')
  const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
  await prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExpiry },
  })
  const makeANiceEmail = (text: string) => `
    <div classname="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello there</>
      <p>${text}</p>

      <p>😘, Davy Hausser</p>
    </div?
  `

  // TODO: make a nice email with functional link
  const msg = {
    to: user.email,
    from: 'davy.hausser@icloud.com',
    subject: 'Your Password Reset Token',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}</strong>`,
    // html: makeANiceEmail(`Your Password Reset Token is here!
    // \n\n
    // <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
  }
  console.log(msg)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  sgMail.send(msg)
  return { message: 'Thanks!' }
}
