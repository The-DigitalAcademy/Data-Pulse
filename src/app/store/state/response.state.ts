import { SurveyResponse } from "src/app/models/response"

export interface ResponseState {
     loading: boolean,
     error: string | null,
     response: SurveyResponse[]
}

//Initial Response State
export const initialResponseState : ResponseState = {
      loading: false,
      error: null,
      response: []
} 