import { AxiosResponse } from 'axios';
import { loadConfig } from 'src/utils/load-config';
import { ApiData } from 'quiz-shared';
import { createBaseApi } from './base-api';

const { webServerUrl, webServerPort } = loadConfig();
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const createApi = (baseUrl: string) => {
  const coreServiceApi = createBaseApi(baseUrl);

  return {
    questions: {
      async getQuestionsList() {
        type Response = AxiosResponse<ApiResponse<ApiData.QuestionsList>>;

        const response = await coreServiceApi.get<Response>('/questions');

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response.data;

        return data;
      },
    },
  };
};

export const coreServiceApi = createApi(
  `http://${webServerUrl}:${webServerPort}`,
);
