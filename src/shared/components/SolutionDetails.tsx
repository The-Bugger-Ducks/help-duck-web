import { useState, FormEvent } from 'react';
import "../styles/components/SolutionDetail.css";

export default function SolutionDetails({handlerSolutionDetails}: {handlerSolutionDetails: (title: string,
description:string) => Promise<void>}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function submitForm(event: FormEvent) {
  event.preventDefault();
  if (
  title === '' ||
  description === ''
  ) {
  return alert('Preencha todos os campos');
  }
  handlerSolutionDetails(title, description)
  }


  return (
  <div className='solutioAdd-container'>
    <form>
      <label for-id="solution">Selecione uma solução para ver seus detalhes</label>
      <div id='form-content'>
        <div className='separator'></div>
        <textarea name="problem-soluction-description" id="soluction-description" placeholder="Selecione uma solução para ver seus detalhes"></textarea>
      </div>
    </form>

  </div>

  );
  }