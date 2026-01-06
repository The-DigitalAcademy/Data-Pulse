export interface results {
    questionID: number;
    questionText: string;
    answers: {
        answerID: number;
        answerText: string;
        count: number;
    }[];
}