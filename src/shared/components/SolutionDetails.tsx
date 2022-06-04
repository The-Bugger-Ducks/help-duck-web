import { useState, FormEvent } from 'react';
import { ProblemSolution } from '../interfaces/problem.interface';
import "../styles/components/SolutionDetail.css";
import CustomTableRow from './Loading/CustomTableRow';

interface bodySolution{
  title: string,
  description:string
}




export default function SolutionDetails(props:bodySolution) {



  return (
  <>
    <div className='solutioAdd-container'>
      <form>
        <label placeholder='Selecione uma solução para ver seus detalhes'>{props.title}</label>
        <div className="form-content">
          <div className='separator'></div>
          <p className='soluction-description' placeholder='Selecione uma solução para ver seus detalhes'>{props.description}</p>
        </div>
      </form>
    </div>
  </>
  );
}