import React, {useState} from "react";
import Comment from "../interfaces/comment.interface";
import ButtonLink from "./ButtonLink";

import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa"

import "../styles/components/TicketComment.css";

interface Props {
  commentData: Comment;
  canSetSolution: boolean;
  handleSetSolution(comment: Comment): Promise<void>;
}

const TicketCommentSupport = () => {
  return (
    <div className="button-wrap">
      <ButtonLink>Aprovar</ButtonLink>
      <ButtonLink>Reprovar</ButtonLink>
    </div>
  );
};

const TicketComment: React.FC<Props> = ({ commentData, canSetSolution, handleSetSolution }) => {
  const { comment, ownerComment } = commentData;

  const [solutionChecked, setSolutionChecked] = useState(false);

  function onSolutionChecked() {
    if (window.confirm("Deseja marcar esse comentário como solução desse chamado ?")) {
      try {
        handleSetSolution(commentData);
        setSolutionChecked(true)        
      } catch {
        setSolutionChecked(false); 
      }
    } else {
      setSolutionChecked(false)
    }

  }

  return (
    <li className="comment-item-container">
      {canSetSolution ? (
        <div className="check-solution" onClick={() => onSolutionChecked()}>
          {solutionChecked ? (
            <FaCheckCircle size="2rem" color="var(--color-green)"/>
          ):(
            <FaRegCheckCircle size="2rem" className="check-solution-icon" title="Adicionar este comentário como solução do chamado"/>
          )}        
       </div>
      ):null}      
      <div className="comment-item">
        <p>{comment}</p>      
        <div className=""></div>
        <div className="comment-wrap">
          {/* Removido temporáriamente por falta de definição */}
          {/* {ownerComment.role === "support" ? <TicketCommentSupport /> : null} */}

          <p className="owner-comment">{ownerComment.email}</p>
        </div>
      </div>
    </li>
  );
};

export default TicketComment;
