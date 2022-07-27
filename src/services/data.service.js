import { get, post, del, put } from "./requests.service";

export const getData = (url) => get(url);

// Questions
export const getQuestion = (_id) => get(`/collections/questions/${_id}`);
export const postQuestion = (data) => post('/collections/questions', data);

// Answers
export const getAnswer = (_id) => get(`/collections/answers/${_id}?populate=owner`);
export const postAnswer = (data) => post('/collections/answers', data);
export const editAnswer = (_id, data) => put(`/collections/answers/${_id}`, data);
export const deleteAnswerById = (_id) => del(`/collections/answers/${_id}`);

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);

// Comments
export const getOneComment = (_id) => get(`/collections/comments/${_id}?populate=owner`)
// TODO Add pagination
export const getComments = (answerId) => get(`/collections/comments?where=answer=${answerId}&sortBy=createdAt asc&populate=owner&page=1&pageSize=100`);
export const postComment = (data) => post('/collections/comments', data);
export const editComment = (_id, data) => put(`/collections/comments/${_id}`, data);
export const deleteComment = (_id) => del(`/collections/comments/${_id}`);
export const getQuestionsByOwnerId = (ownerId) => get(`/collections/questions?where=owner=${ownerId}`);

