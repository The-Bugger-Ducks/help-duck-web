import { useState, FormEvent } from 'react';
import "../styles/components/SolutionAdd.css";
import Button from './Button';
import ButtonDelete from './ButtonDelete';


export default function SolutionAddCenter({handlerCreateTagSolution}: {handlerCreateTagSolution: (title: string,
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
  handlerCreateTagSolution(title, description)
  }

  return (
  <div className='tag-add-container'>
    <form action="#">
      <label for-id="new-solution">Cadastro de nova solução</label>
      <div id='form-content'>
        <textarea name="problem-title" id="problem-title" placeholder="Título do problema"></textarea>
        <div className='separator'></div>
        <textarea name="problem-description" id="problem-description" placeholder="Descrição do problema"></textarea>
      </div>
      <div id='tag-add-button'>
      <ButtonDelete
          type="button"
          width="12rem"
          height="2rem"
        >
          Cancelar
      </ButtonDelete>

      <Button type="submit" width="12rem" height="2rem" color="#FAFAFA">
        Adicionar
      </Button>
      </div>

    </form>

  </div>

  );
  }