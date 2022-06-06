import React from 'react';

import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import Button from './Button';

import { Solution } from '../interfaces/solution.interface';

import '../styles/components/TicketSolution.css';

interface Props {
  solution: Solution;
  hiddenSolutionVote: boolean;
  handleSolutionVote: (vote: boolean) => Promise<void>;
}

const TicketSolution: React.FC<Props> = ({
  solution,
  hiddenSolutionVote,
  handleSolutionVote,
}) => {
  const { solutionComment } = solution;

  const SolutionVoteContainer = () => {
    return (
      <div className="solution-vote-button">
        <Button
          backgroundColor="var(--color-white-light)"
          color="var(--color-green)"
          border="1px solid var(--color-green)"
          height="1.5rem"
          width="210px"
          border-radius="8px"
          fontSize="0.7rem"
          onClick={() => handleSolutionVote(true)}
        >
          <span className="solution-vote-button-text">
            <AiOutlineLike size="14px" />
            FOI ÚTIL PRA MIM{' | '}
            {solution.upVote != 1
              ? `${solution.upVote} votos`
              : `${solution.upVote} voto`}
          </span>
        </Button>
        <Button
          backgroundColor="var(--color-white-light)"
          color="var(--color-red)"
          height="1.5rem"
          width="210px"
          border="1px solid var(--color-red)"
          border-radius="8px"
          fontSize="0.7rem"
          onClick={() => handleSolutionVote(false)}
        >
          <span className="solution-vote-button-text">
            <AiOutlineDislike size="14px" />
            NÃO FOI ÚTIL PRA MIM{' | '}
            {solution.downVote != 1
              ? `${solution.downVote} votos`
              : `${solution.downVote} voto`}
          </span>
        </Button>
      </div>
    );
  };

  return (
    <section id="solution-ticket-container">
      <h4 className="solution-title">SOLUÇÃO</h4>
      <div className="solution-wrap">
        <p>{solutionComment.comment}</p>
        <div className="footer-solution">
          <div className="solution-votes">
            {!hiddenSolutionVote ? <SolutionVoteContainer /> : null}
          </div>
          <small className="solution-name">
            {solutionComment.ownerComment.firstName}(
            {solutionComment.ownerComment.email})
          </small>
        </div>
      </div>
    </section>
  );
};

export default TicketSolution;
