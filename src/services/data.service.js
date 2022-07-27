import { get, post } from "./requests.service";

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);

export const getData = (url) => get(url);

export const getQuestion = (_id) => get(`/collections/questions/${_id}`);

export const postQuestion = (data) => post('/collections/questions', data);

export const postAnswer = (data) => post('/collections/answers', data);

export const postComment = (data) => post('/collections/comments', data);

export const getQuestionsByOwnerId = (ownerId) => get(`/collections/questions?where=owner=${ownerId}`);

