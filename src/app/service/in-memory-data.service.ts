// src/app/services/in-memory-data.service.ts
import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
  RequestCore,
} from 'angular-in-memory-web-api';
import { survey } from '../models/survey';
import { user } from '../models/user';
import { question } from '../models/question';
import { choice } from '../models/choice';
import { response } from '../models/response';
import { results } from '../models/result';

const DB_KEY = 'angular-in-memory-db';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const persisted = this.loadFromStorage();
    if (persisted) return persisted;

    // ------------------- USERS -------------------
    const users: user[] = [
      { id: 'u1', name: 'John', surname: 'Doe', email: 'john@example.com', role: 'coordinator', password: 'pass' },
      { id: 'u2', name: 'Jane', surname: 'Smith', email: 'jane@example.com', role: 'respondent', password: 'pass' },
      { id: 'u3', name: 'Bob', surname: 'Lee', email: 'bob@example.com', role: 'respondent', password: 'pass' },
      { id: 'u4', name: 'Alice', surname: 'Brown', email: 'alice@example.com', role: 'coordinator', password: 'pass' },
    ];

    // ------------------- CHOICES -------------------
    const choices: choice[] = [
      // Q1
      { id: 1, text: 'Very Satisfied' },
      { id: 2, text: 'Satisfied' },
      { id: 3, text: 'Neutral' },
      { id: 4, text: 'Dissatisfied' },
      { id: 5, text: 'Very Dissatisfied' },
      // Q2
      { id: 6, text: 'Yes' },
      { id: 7, text: 'No' },
      // Q3
      { id: 8, text: 'Excellent' },
      { id: 9, text: 'Good' },
      { id: 10, text: 'Average' },
      { id: 11, text: 'Poor' },
    ];

    // ------------------- QUESTIONS -------------------
    const questions: question[] = [
      {
        id: 1,
        text: 'How satisfied are you with our service?',
        choices: choices.filter(c => c.id <= 5),
      },
      {
        id: 2,
        text: 'Would you recommend us to a friend?',
        choices: choices.filter(c => c.id === 6 || c.id === 7),
      },
      {
        id: 3,
        text: 'How would you rate the product quality?',
        choices: choices.filter(c => c.id >= 8),
      },
    ];

    // ------------------- SURVEYS -------------------
    const surveys: survey[] = [
      {
        id: 1,
        title: 'Customer Satisfaction Survey',
        desc: 'We value your feedback!',
        questions: [questions[0], questions[1]],
        isOpen: true,
        createdAt: '2024-01-15T10:00:00Z',
        openedAt: '2024-01-16T00:00:00Z',
      },
      {
        id: 2,
        title: 'Employee Engagement Survey',
        desc: 'Help us improve the workplace.',
        questions: [questions[1], questions[2]],
        isOpen: false,
        createdAt: '2024-02-01T09:30:00Z',
        openedAt: '2024-02-02T00:00:00Z',
        closedAt: '2024-02-10T23:59:59Z',
      },
      {
        id: 3,
        title: 'Product Feedback Survey',
        desc: 'Tell us what you think!',
        questions: questions,
        isOpen: true,
        createdAt: '2024-03-05T14:15:00Z',
        openedAt: '2024-03-06T00:00:00Z',
      },
    ];

    // ------------------- RESPONSES -------------------
    const responses: response[] = [
      {
        id: 1,
        surveyId: 1,
        userId: 'u2',
        answers: [
          { questionId: 1, choiceId: 2 },
          { questionId: 2, choiceId: 6 },
        ],
        submittedAt: '2024-01-17T12:30:00Z',
      },
      {
        id: 2,
        surveyId: 1,
        userId: 'u3',
        answers: [
          { questionId: 1, choiceId: 1 },
          { questionId: 2, choiceId: 6 },
        ],
        submittedAt: '2024-01-18T09:15:00Z',
      },
    ];

    // ------------------- RESULTS (precomputed) -------------------
    const results = this.computeResults(surveys, responses, questions, choices);

    const db = { users, surveys, questions, choices, responses, results };
    this.saveToStorage(db);
    return db;
  }

  // ------------------------------------------------------------------
  // Persistence
  // ------------------------------------------------------------------
  private loadFromStorage(): any | null {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private saveToStorage(db: any): void {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  // ------------------------------------------------------------------
  // GET – handle collection requests
  // ------------------------------------------------------------------
  get(reqInfo: RequestInfo) {
    const { collectionName, id, req } = reqInfo;

    // Collection GET: /api/users, /api/survey, /api/response, /api/results
    if (!id) {
      const db = this.loadFromStorage() || {};
      let body: any[] = [];

      switch (collectionName) {
        case 'users':
          body = db.users || [];
          break;
        case 'survey':
          body = db.surveys || [];
          break;
        case 'response':
          body = db.responses || [];
          break;
        case 'results':
          body = db.results || [];
          break;
        default:
          return undefined; // let default handle
      }

      return reqInfo.utils.createResponse$(() => ({
        body,
        status: STATUS.OK,
      }));
    }

    // GET by ID – let default handle
    return undefined;
  }

  // ------------------------------------------------------------------
  // POST – create user, survey, response
  // ------------------------------------------------------------------
  post(reqInfo: RequestInfo) {
    const { collectionName } = reqInfo;
    const db = this.loadFromStorage() || {};
    const payload = reqInfo.utils.getJsonBody(reqInfo.req);

    if (collectionName === 'users') {
      const newUser = { ...payload, id: Date.now().toString() } as user;
      db.users = [...(db.users || []), newUser];
      this.saveToStorage(db);
      return this.respond({ body: newUser, status: STATUS.CREATED }, reqInfo);
    }

    if (collectionName === 'survey') {
      const newSurvey = {
        ...payload,
        id: this.genId(db.surveys || []),
      } as survey;
      console.log("Survey in the db: ", newSurvey)
      db.surveys = [...(db.surveys || []), newSurvey];
      this.saveToStorage(db);
      console.log(db);
      return this.respond({ body: newSurvey, status: STATUS.CREATED }, reqInfo);
    }

    if (collectionName === 'response') {
      const newResp = {
        ...payload,
        id: this.genId(db.responses || []),
      } as response;
      db.responses = [...(db.responses || []), newResp];
      db.results = this.computeResults(db.surveys, db.responses, db.questions, db.choices);
      this.saveToStorage(db);
      return this.respond({ body: newResp, status: STATUS.CREATED }, reqInfo);
    }

    return undefined;
  }

  // ------------------------------------------------------------------
  // PUT – update survey
  // ------------------------------------------------------------------
  put(reqInfo: RequestInfo) {
    const { collectionName, id } = reqInfo;
    if (collectionName === 'survey' && id) {
      const db = this.loadFromStorage() || {};
      const payload = reqInfo.utils.getJsonBody(reqInfo.req) as survey;
      const rawID = Number(id);
      db.surveys = (db.surveys || []).map((s: survey) => (s.id === rawID ? payload : s));
      this.saveToStorage(db);
      return this.respond({ body: payload, status: STATUS.OK }, reqInfo);
    }
    return undefined;
  }

  // ------------------------------------------------------------------
  // PATCH – open/close survey
  // ------------------------------------------------------------------
  patch(reqInfo: RequestInfo) {
    const { collectionName, id } = reqInfo;
    if (collectionName === 'survey' && id) {
      const db = this.loadFromStorage() || {};
      const patch = reqInfo.utils.getJsonBody(reqInfo.req);
      const rawID = Number(id);
      const survey = (db.surveys || []).find((s: survey) => s.id === rawID);
      if (!survey) return this.respond({ status: STATUS.NOT_FOUND }, reqInfo);

      Object.assign(survey, patch);
      this.saveToStorage(db);
      return this.respond({ body: survey, status: STATUS.OK }, reqInfo);
    }
    return undefined;
  }

  // ------------------------------------------------------------------
  // DELETE – survey
  // ------------------------------------------------------------------
  delete(reqInfo: RequestInfo) {
    const { collectionName, id } = reqInfo;
    console.log("colletionName: ", collectionName, " id: ", id);
    if (collectionName === 'survey' && id) {
      const db = this.loadFromStorage() || {};
      const rawID = Number(id);
      db.surveys = (db.surveys || []).filter((s: survey) => s.id !== rawID);
      this.saveToStorage(db);
      return this.respond({ status: STATUS.NO_CONTENT }, reqInfo);
    }
    return undefined;
  }

  // ------------------------------------------------------------------
  // Helper: genId
  // ------------------------------------------------------------------
  genId<T extends { id: any }>(collection: T[]): any {
    return collection.length > 0 ? Math.max(...collection.map(i => i.id)) + 1 : 1;
  }

  // ------------------------------------------------------------------
  // Helper: respond
  // ------------------------------------------------------------------
  private respond(options: any, reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => options);
  }

  // ------------------------------------------------------------------
  // Compute results
  // ------------------------------------------------------------------
  private computeResults(
    surveys: survey[],
    responses: response[],
    questions: question[],
    choices: choice[]
  ): results[] {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    const choiceMap = new Map(choices.map(c => [c.id, c]));

    const resultMap = new Map<number, results>();

    surveys
      .filter(s => !s.isOpen)
      .flatMap(s => s.questions)
      .forEach(q => {
        resultMap.set(q.id, {
          questionID: q.id,
          questionText: q.text,
          answers: q.choices.map(ch => ({
            answerID: ch.id,
            answerText: ch.text,
            count: 0,
          })),
        });
      });

    responses.forEach(resp => {
      const survey = surveys.find(s => s.id === resp.surveyId);
      if (!survey || survey.isOpen) return;

      resp.answers.forEach(ans => {
        const result = resultMap.get(ans.questionId);
        if (result) {
          const answer = result.answers.find(a => a.answerID === ans.choiceId);
          if (answer) answer.count++;
        }
      });
    });

    return Array.from(resultMap.values());
  }
}
