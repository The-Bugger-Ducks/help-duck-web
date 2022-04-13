import {User} from "./user.interface"

export default interface Comment {
  comment: string,
  ownerComment: User
}
