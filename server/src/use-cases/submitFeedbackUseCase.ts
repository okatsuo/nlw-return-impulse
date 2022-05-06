import { IMailAdapter } from '../adapters/mailAdapter'
import { IFeedbacksRepository } from '../repositories/feedbackRepository'

export type ISubmitFeedbackUseCaseRequest = {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: IFeedbacksRepository,
    private readonly mailAdapter: IMailAdapter
  ) { }
  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request

    const requiredFields = ['type', 'comment']

    for (const field of requiredFields) {
      //@ts-expect-error
      if (!request[field]) {
        throw new Error(`Missing: [${field}]`)
      }
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbackRepository.create({ comment, type, screenshot })
    await this.mailAdapter.sendMail({
      subject: `Novo feedback - [${type}]`,
      body: [
        `<div style="font-family: sans-serif; font-size 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário do feedback: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`
      ].join('\n')
    })
  }
}

