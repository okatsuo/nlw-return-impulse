export type ISendMail = {
  subject: string
  body: string
}

export type IMailAdapter = {
  sendMail: (data: ISendMail) => Promise<void>
}