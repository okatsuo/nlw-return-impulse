import { prismaClient } from '../../prisma';
import { IFeedbacksRepository, IFeedbackCreateData } from '../feedbackRepository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, type, screenshot }: IFeedbackCreateData) {
    await prismaClient.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  };
}