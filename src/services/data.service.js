import { post } from "./requests.service";

export const vote = (answerId, userVote) => post(`/collections/answers/${answerId}/vote`, userVote);