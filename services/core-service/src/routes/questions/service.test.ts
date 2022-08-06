import Service, { QuestionServiceError } from './service';

const mockQuestions = [
  {
    id: 1,
    question: 'How many states are in the USA?',
    options: ['52', '40', '50', '51'],
  },
  {
    id: 2,
    question: 'What is the capital of Florida?',
    options: ['Tampa Bay', 'Tallahassee', 'Orlando', 'Miami'],
  },
  {
    id: 3,
    question: 'What year was the Declaration of Independence signed?',
    options: ['1776', '1772', '1792', '1881'],
  },
  {
    id: 4,
    question: 'How many states were originally part of the US?',
    options: ['9', '13', '11', '50'],
  },
];

      const repo = {
        getQuestions: jest.fn().mockResolvedValueOnce(mockQuestions),
      };

      const service = new Service(repo as any);

      const questions = await service.getQuestions();

      expect(questions).toBe(mockQuestions);
    });

    it('throws file read error when internal error is thrown', async () => {
      const repo = {
        getQuestions: jest.fn().mockRejectedValueOnce(null),
      };

      const service = new Service(repo as any);

      expect.assertions(1);

      try {
        await service.getQuestions();
      } catch (e: any) {
        expect(e.type).toBe(QuestionServiceError.FileReadError);
      }
    });
  });
});
