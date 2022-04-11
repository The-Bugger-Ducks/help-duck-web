import React from "react";
import Comment from "../interfaces/comment.interface";
import ButtonLink from "./ButtonLink";

import "../styles/components/TicketComment.css";

interface Props {
  commentData: Comment;
}

const TicketCommentSupport = () => {
  return (
    <div className="button-wrap">
      <ButtonLink>Aprovar</ButtonLink>
      <ButtonLink>Reprovar</ButtonLink>
    </div>
  );
};

const TicketComment: React.FC<Props> = ({ commentData }) => {
  const { comment, ownerComment } = commentData;

  return (
    <li className="comment-item">
      <p>{comment}</p>
      <div className="comment-wrap">
        {ownerComment.role === "support" ? <TicketCommentSupport /> : null}

        <p className="owner-comment">{ownerComment.email}</p>
      </div>
    </li>
  );
};

export default TicketComment;
