import React, { useEffect, useState } from 'react';

import SessionController from '../utils/handlers/SessionController';
import { Problem, ProblemSolution } from '../interfaces/problem.interface';
import { ProblemRequests } from '../utils/requests/Problem.requests';
import CustomTableRow from './Loading/CustomTableRow';

import '../styles/components/SolutionsList.css';
import Button from './Button';

interface SolutionsListProps {
  problem?: Problem;
  keyword?: string;
}

const SolutionsList: React.FC<SolutionsListProps> = ({ problem, keyword }) => {
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<ProblemSolution[]>([]);
  const [searchResult, setSearchResult] = useState([]);

  const problemRequest = new ProblemRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    problem != null && getSolutionsByProblem(problem.id);
    keyword != null && getSolutionsByKeyword(keyword);
  }, []);

  async function getSolutionsByProblem(id: string) {
    setLoading(true);

    const problem = await problemRequest.getProblem(id);
    setSolutions(problem?.solutionList ?? []);

    setLoading(false);
  }

  async function getSolutionsByKeyword(keyword: string) {
    console.log('buscando!');
  }

  function getPossibleSolutionsList() {
    return (
      <section className="solution-list-container">
        <h3>Soluções possíveis</h3>
        <div className="grid-solutions">
          <table>
            <tbody>
              <tr>
                <th>Título da solução</th>
              </tr>
              {solutions.length > 0 ? (
                solutions.map((solution, index) => {
                  return (
                    <>
                      <tr
                        key={index}
                        onClick={() => console.log(solution.title)}
                      >
                        <td>{solution.title}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <CustomTableRow
                  loading={loading}
                  colSpan={4}
                  typeTableRowText="soluções"
                />
              )}
            </tbody>
          </table>
        </div>
        <div className="new-solution">
          <Button
            color="#F2F2F3"
            backgroundColor="#ADB5BD"
            width="12rem"
            height="2rem"
            fontSize="0.8rem"
            fontWeight="600"
            onClick={() => console.log('nova solução')}
          >
            Nova solução
          </Button>
        </div>
      </section>
    );
  }

  function getSearchResult() {
    return (
      <section className="solution-list-container">
        <div className="grid-solutions">
          <table>
            <tbody>
              <tr>
                <th>Título da solução</th>
                <th>Descrição da solução</th>
              </tr>
              {searchResult.length > 0 ? (
                searchResult.map((result, index) => {
                  return (
                    <>
                      <tr key={index} onClick={() => console.log(result)}>
                        <td>{result}</td>
                        <td>{result}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <CustomTableRow
                  loading={loading}
                  colSpan={4}
                  typeTableRowText="busca"
                />
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (userInformation?.role === 'support') return getPossibleSolutionsList();
  if (keyword != null) return getSearchResult();
  return <></>;
};

export default SolutionsList;
