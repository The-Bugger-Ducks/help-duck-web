import React from "react";

import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai"

import Button from "./Button";

import Solution from "../interfaces/solution.interface";

import "../styles/components/TicketSolution.css";

interface Props {
  solution: Solution;
}

const TicketSolution: React.FC<Props> = ({ solution }) => {
  const { solutionComment } = solution;

  async function handleSolutionVote(vote : boolean) {
    return;
  }

  const SolutionVoteContainer = () => {
    return (
      <div className="solution-vote-button">
        <Button
          backgroundColor="var(--color-white-light)"
          color="var(--color-green)"
          border="1px solid var(--color-green)"
          height="1.5rem"
          width="160px"
          border-radius="8px"
          fontSize="0.7rem"
          onClick={() => handleSolutionVote(true)}
        >
          <span className="solution-vote-button-text">
            <AiOutlineLike size="14px" />
            FOI ÚTIL PRA MIM
          </span>
        </Button>
        <Button
          backgroundColor="var(--color-white-light)"
          color="var(--color-red)"
          height="1.5rem"
          width="160px"
          border="1px solid var(--color-red)"
          border-radius="8px"
          fontSize="0.7rem"
          onClick={() => handleSolutionVote(false)}
        >
          <span className="solution-vote-button-text">
            <AiOutlineDislike size="14px"  />
            NÃO FOI ÚTIL PRA MIM
          </span>
        </Button>
      </div>
    );
  }

  return (
    <section id="solution-ticket-container">
      <h4 className='solution-title'>Solução</h4>
      <div className="solution-wrap">
        <p>{solutionComment.comment}</p>
        
        <div className="footer-solution">
          <SolutionVoteContainer />  
          <small>
            {solutionComment.ownerComment.firstName}
            ({solutionComment.ownerComment.email})
          </small>
        </div>
      </div>
    </section>
  );
};

export default TicketSolution;
