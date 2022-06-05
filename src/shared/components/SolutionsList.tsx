import React, { useEffect, useState } from 'react';

import SessionController from '../utils/handlers/SessionController';
import { ProblemSolution } from '../interfaces/problem.interface';
import { ProblemRequests } from '../utils/requests/Problem.requests';
import CustomTableRow from './Loading/CustomTableRow';

import '../styles/components/SolutionsList.css';
import Button from './Button';
import { SolutionRequests } from '../utils/requests/Solution.requests';
import Pagination from './Pagination/Pagination';
import { Pageable } from '../interfaces/pagable.interface';
import SolutionAddCenter from './SolutionAddCenter';
import SolutionDetails from './SolutionDetails';

interface SolutionsListProps {
  problemId?: string;
  keyword?: string;
  type?: 'searchSolution' | 'possibleSolutions';
  handlerSolutionDetails?: (
    title: string,
    description: string
  ) => Promise<void>;
  handlerCreateTagSolution?: (
    title: string,
    description: string
  ) => Promise<void>;
}

interface SearchResultProps {
  description: string;
  id: string;
  problemId: string;
  title: string;
}

const SolutionsList: React.FC<SolutionsListProps> = ({
  problemId,
  keyword,
  type,
  handlerCreateTagSolution,
}) => {
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<ProblemSolution[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResultProps[]>([]);
  const [pageable, setPageable] = useState<Pageable>();

  const problemRequest = new ProblemRequests();
  const solutionRequest = new SolutionRequests();
  const userInformation = SessionController.getUserInfo();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDetails, setIsVisibleDetails] = useState(false);
  const [bodySolution, setBodySolution] = useState({
    title: '',
    description: '',
  });

  function handlerIsVisible(visible: boolean) {
    setIsVisible(visible);
    if (visible) setIsVisibleDetails(false);
  }

  function handlerIsVisibleDetails(title: string, description: string) {
    setIsVisible(false);
    setIsVisibleDetails(true);
    setBodySolution({ title: title, description: description });
  }

  useEffect(() => {
    userInformation?.role === 'support' && getSolutionsByProblem();
  }, [problemId]);

  useEffect(() => {
    keyword != undefined && getSolutionsByKeyword();
  }, [keyword]);

  async function getSolutionsByProblem() {
    setLoading(true);

    if (problemId != null) {
      const problem = await problemRequest.getProblem(problemId!);
      setSolutions(problem?.solutionList ?? []);
    }

    setLoading(false);
  }

  async function getSolutionsByKeyword(sorting?: string) {
    setLoading(true);

    if (keyword !== undefined && keyword.length > 0) {
      const solutions =
        sorting !== null
          ? await solutionRequest.searchSolutionByKeyword(keyword, sorting)
          : await solutionRequest.searchSolutionByKeyword(keyword);
      setSearchResult(solutions.content ?? []);
      setPageable(solutions);
    }

    setLoading(false);
  }

  function getPossibleSolutionsList() {
    return (
      <>
        <section className="solution-list-components">
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
                            onClick={() => {
                              handlerIsVisibleDetails(
                                solution.title,
                                solution.description
                              );
                            }}
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
                onClick={() => {
                  handlerIsVisible(true);
                }}
              >
                Nova solução
              </Button>
            </div>
          </section>
          {isVisible && (
            <section className="section-solutionAdd">
              <SolutionAddCenter
                handlerCreateTagSolution={handlerCreateTagSolution}
                handlerIsVisible={handlerIsVisible}
              />
            </section>
          )}
          {isVisibleDetails && (
            <section className="section-solutionDetails">
              <SolutionDetails
                title={bodySolution.title}
                description={bodySolution.description}
              />
            </section>
          )}
        </section>
      </>
    );
  }

  function handlePageable(pageNumber: number, pageSize: number) {
    getSolutionsByKeyword(`page=${pageNumber}&size=${pageSize}`);
  }

  function getSearchResult() {
    return (
      <div className="solutions-center">
        <section className="solution-list-container search">
          <div className="grid-solutions">
            <table>
              <tbody>
                <tr>
                  <th id="first-column">Título da solução</th>
                  <th>Descrição da solução</th>
                </tr>
                {searchResult.length > 0 ? (
                  searchResult.map((result, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          onClick={() => {
                            handlerIsVisibleDetails(
                              result.title,
                              result.description
                            );
                          }}
                        >
                          <td>{result.title}</td>
                          <td>{result.description}</td>
                        </tr>
                      </>
                    );
                  })
                ) : keyword !== undefined && keyword.length > 0 ? (
                  <CustomTableRow
                    loading={loading}
                    colSpan={4}
                    typeTableRowText="busca-vazia"
                  />
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

          <Pagination pageable={pageable} onChangePage={handlePageable} />
        </section>
        {isVisibleDetails ? (
          <section className="section-solutionDetails">
            <SolutionDetails
              title={bodySolution.title}
              description={bodySolution.description}
            />
          </section>
        ) : null}
      </div>
    );
  }

  return type == 'searchSolution'
    ? getSearchResult()
    : getPossibleSolutionsList();
};

export default SolutionsList;
