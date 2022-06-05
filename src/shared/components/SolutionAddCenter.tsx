import { useState, FormEvent } from 'react';
import '../styles/components/SolutionAdd.css';
import Button from './Button';
import ButtonDelete from './ButtonDelete';

export default function SolutionAddCenter({
  handlerCreateTagSolution,
  handlerIsVisible,
}: {
  handlerCreateTagSolution: any;
  handlerIsVisible: any;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    if (title === '' || description === '') {
      return alert('Preencha todos os campos');
    }
    await handlerCreateTagSolution(title, description);
    window.location.reload();
  }

  return (
    <div className="tag-add-container">
      <form onSubmit={submitForm}>
        <label for-id="new-solution">Cadastro de nova solução</label>
        <div id="form-content">
          <textarea
            name="problem-title"
            id="problem-title"
            placeholder="Título da solução"
            onChange={event => setTitle(event.target.value)}
          />
          <div className="separator"></div>
          <textarea
            name="problem-description"
            id="problem-description"
            placeholder="Descrição da solução"
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <div id="tag-add-button">
          <ButtonDelete
            type="button"
            width="12rem"
            height="2rem"
            onClick={() => handlerIsVisible(false)}
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
