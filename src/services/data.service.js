import { get, post, del, patch, put } from "./requests.service";

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);

export const getData = (url) => get(url);

export const getQuestion = (_id) => get(`/collections/questions/${_id}`);

export const postQuestion = (data) => post('/collections/questions', data);

export const getAnswer = (_id) => get(`/collections/answers/${_id}?populate=owner`);

export const postAnswer = (data) => post('/collections/answers', data);

export const editAnswer = (_id, data) => put(`/collections/answers/${_id}`, data);

export const deleteAnswerById = (_id) => del(`/collections/answers/${_id}`);

export const postComment = (data) => post('/collections/comments', data);

export const getQuestionsByOwnerId = (ownerId) => get(`/collections/questions?where=owner=${ownerId}`);

