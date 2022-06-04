import "../styles/components/SolutionDetail.css";

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
        <div className='separator'></div>
        <p className="soluction-description" placeholder='Selecione uma solução para ver seus detalhes'>{props.description}</p>

      </form>
    </div>
  </>
  );
}