import { get, post, del, put } from "./requests.service";

export const getData = (url) => get(url);

// Circles
export const getCoreCircles = () => get(`/collections/circles?where=type=core`);
export const getUserCircles = () => get(`/collections/circles?where=type=user`);
export const getCircleById = (_id) => get(`/collections/circles/${_id}`);
export const createCircle = (data) => post('/collections/circles', data);
export const editCircle = (_id, data) => put(`/collections/circles/${_id}`, data);

// Questions
export const getQuestion = (_id) => get(`/collections/questions/${_id}`);
export const postQuestion = (data) => post('/collections/questions', data);
export const getQuestionsByOwnerId = (ownerId) => get(`/collections/questions?where=owner=${ownerId}`);
export const hideQuestionById = (_id, bool) => put(`/collections/questions/${_id}`, { isHidden: true });

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

// User
export const getUserDataById = (_id) => get(`/users/${_id}`);
export const editUser = (_id, data) => put(`/users/${_id}`, data);
export const uploadPicture = (_id, base64img) => put(`/users/${_id}`, { imageUrl: base64img });
