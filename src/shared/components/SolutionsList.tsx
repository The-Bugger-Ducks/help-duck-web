import React, { useEffect, useState } from 'react';

import SessionController from '../utils/handlers/SessionController';
import { ProblemSolution } from '../interfaces/problem.interface';
import { ProblemRequests } from '../utils/requests/Problem.requests';
import CustomTableRow from './Loading/CustomTableRow';

import '../styles/components/SolutionsList.css';
import Button from './Button';
import SolutionAddCenter from './SolutionAddCenter';
import SolutionDetails from './SolutionDetails';

interface SolutionsListProps {
  problemId?: string;
  keyword?: string;
  handlerSolutionDetails?:(title: string,
    description:string) => Promise<void>;
  handlerCreateTagSolution?:(title: string,
    description:string) => Promise<void>;

}

const SolutionsList: React.FC<SolutionsListProps> = ({
  problemId,
  keyword,
  handlerCreateTagSolution
}) => {
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<ProblemSolution[]>([]);
  const [searchResult, setSearchResult] = useState([]);

  const problemRequest = new ProblemRequests();
  const userInformation = SessionController.getUserInfo();
  const [isVisible, setIsVisible] = useState(false);
  const [IsVisibleDetails, setIsVisibleDetails] = useState(false);
  const [bodySolution, setBodySolution] = useState({"title":'', "description":''});
  
  
  function handlerIsVisible(Visible:boolean){
    setIsVisible(Visible);
  } 

  function handlerIsVisibleDetails(VisibleDet:boolean, title:string, description:string){
    setIsVisibleDetails(VisibleDet)
    setBodySolution({"title":title, "description":description})
  }


  useEffect(() => {
    userInformation?.role === 'support' && getSolutionsByProblem();
  }, [problemId]);

  useEffect(() => {
    keyword != null && getSolutionsByKeyword();
  }, [keyword]);

  async function getSolutionsByProblem() {
    setLoading(true);

    if (problemId != null) {
      const problem = await problemRequest.getProblem(problemId!);
      setSolutions(problem?.solutionList ?? []);
    }
    setLoading(false);
  }

  async function getSolutionsByKeyword() {
    console.log('buscando!');
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
                        onClick={() => {handlerIsVisibleDetails(true, solution.title, solution.description) }}
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
            onClick={ () => {handlerIsVisible(true); handlerIsVisibleDetails(false, '', '')}}
          >
            Nova solução
          </Button>
        </div>
      </section>
      {isVisible ?
        <section className='section-solutionAdd'>
          <SolutionAddCenter
           handlerCreateTagSolution={handlerCreateTagSolution} 
           handlerIsVisible = {handlerIsVisible}/>
        </section>:null  
      }  
      {IsVisibleDetails?
          <section  className='section-solutionDetails'>   
          <SolutionDetails
          title= {bodySolution.title}
          description= {bodySolution.description}/>
          </section>:null
        }  
      </section>
      </>
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
  return getSearchResult();
};

export default SolutionsList;
