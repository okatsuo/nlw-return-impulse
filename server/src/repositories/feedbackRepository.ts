export type IFeedbackCreateData = {
  type: string;
  comment: string;
  screenshot?: string;
}

export type IFeedbacksRepository = {
  create: (data: IFeedbackCreateData) => Promise<void>
}