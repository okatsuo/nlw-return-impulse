import { SubmitFeedbackUseCase } from './submitFeedbackUseCase'

const makeSut = () => {
  const createFeedbackSpy = jest.fn()
  const sendMailSpy = jest.fn()
  const sut = new SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy })

  return {
    sut,
    createFeedbackSpy,
    sendMailSpy
  }
}

describe('SubmitFeedbackUseCase', () => {
  it('should not be able to submit a feedback with invalid image', async () => {
    const { sut } = makeSut()

    await expect(
      sut.execute({
        comment: 'example_comment', type: 'example_type', screenshot: 'invalid_image'
      })
    ).rejects.toThrow('Invalid screenshot format.')
  });

  it('should not be able to submit a feedback without type', async () => {
    const { sut } = makeSut()

    await expect(
      sut.execute({
        comment: 'example_comment', type: '', screenshot: 'invalid_image'
      })
    ).rejects.toThrow(`Missing: [type]`)
  });

  it('should not be able to submit a feedback without comment', async () => {
    const { sut } = makeSut()

    await expect(
      sut.execute({
        comment: '', type: 'example_type', screenshot: 'invalid_image'
      })
    ).rejects.toThrow(`Missing: [comment]`)
  });

  it('should be able to submit a feedback', async () => {
    const { sut, createFeedbackSpy, sendMailSpy } = makeSut()

    await expect(
      sut.execute({
        comment: 'example_comment', type: 'example_type', screenshot: 'data:image/png;base64:XyqAASDmaOAJbnyabdHBAU'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1)
    expect(sendMailSpy).toHaveBeenCalledTimes(1)
  });
});