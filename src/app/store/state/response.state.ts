
export interface ResponseState {
     loading: boolean,
     error: string | null,
     response: Response[]
}

//Initial Response State
export const initialResponseState : ResponseState = {
      loading: false,
      error: null,
      response: []
} 