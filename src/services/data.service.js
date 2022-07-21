import { get, post } from "./requests.service";

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);

export const getData = (url) => get(url);

export const postQuestion = (data) => post('/collections/questions', data)