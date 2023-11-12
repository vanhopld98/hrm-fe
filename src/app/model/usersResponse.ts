import {UserProfile} from "./userProfile";

export interface UsersResponse {
  totalPage?: number,
  totalRecord?: number,
  userProfileResponses?: UserProfile[]
}
