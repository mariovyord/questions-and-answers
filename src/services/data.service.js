import { post } from "./requests.service";

export const vote = (answerId, userVote, userToken) => post(`/collections/answers/${answerId}/vote`, userVote, userToken);
