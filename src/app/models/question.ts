import { choice } from "./choice";

export interface question {
  id: number;
  text: string;
  choices: choice[];
}