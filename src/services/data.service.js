import { get, post, del, patch } from "./requests.service";

export const getData = (url) => get(url);

// Circles
export const getCoreCircles = () => get(`/collections/circles?where=type=core`);
export const getUserCircles = () => get(`/collections/circles?where=type=user`);
export const getCircleById = (_id) => get(`/collections/circles/${_id}`);

export const createCircle = (data) => post('/collections/circles', data);

export const editCircle = (_id, data) => patch(`/collections/circles/${_id}`, data);

export const deleteCircle = (_id) => del(`/collections/circles/${_id}`);

// Questions
export const getQuestion = (_id) => get(`/collections/questions/${_id}`);
export const getQuestionsByOwnerId = (ownerId) => get(`/collections/questions?where=owner=${ownerId}`);
export const getQuestionsInCircleCount = (_id) => get(`/collections/questions?where=circle=${_id}&count=true`)

export const postQuestion = (data) => post('/collections/questions', data);

export const hideQuestionById = (_id) => patch(`/collections/questions/${_id}`, { isHidden: true });

// Answers
export const getAllAnswers = ({
	page = 1,
	pageSize = 10,
	options = '',
	sortBy = 'score%20desc'
}) => get(`/collections/answers?sortBy=${sortBy}&page=${page}&pageSize=${pageSize}&populate=owner&${options}`);

export const countAnswers = (options = '') => get(`/collections/answers?${options}${options ? '&' : ''}count=true`)
export const getAnswer = (_id) => get(`/collections/answers/${_id}?populate=owner`);
export const postAnswer = (data) => post('/collections/answers', data);
export const editAnswer = (_id, data) => patch(`/collections/answers/${_id}`, data);
export const deleteAnswerById = (_id) => del(`/collections/answers/${_id}`);

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);

// Comments
export const getOneComment = (_id) => get(`/collections/comments/${_id}?populate=owner`)
export const getComments = (answerId) => get(`/collections/comments?where=answer=${answerId}&sortBy=createdAt asc&populate=owner&page=1&pageSize=100`);
export const postComment = (data) => post('/collections/comments', data);
export const editComment = (_id, data) => patch(`/collections/comments/${_id}`, data);
export const deleteComment = (_id) => del(`/collections/comments/${_id}`);

// User
export const getUserDataById = (_id) => get(`/users/${_id}`);
export const editUser = (_id, data) => patch(`/users/${_id}`, data);
export const uploadPicture = (_id, base64img) => patch(`/users/${_id}`, { imageUrl: base64img });

// Leaderboard
export const getLeaderboard = () => get(`/users/leaderboard`);

