import "../styles/components/Footer.css";

interface Props {
  id?: string;
}

const Footer: React.FC<Props> = ({ id = "" }) => {
  return (
    <footer className="footer" id={id}>
      <span>Todos os direitos reservados | © The Bugger Ducks</span>
    </footer>
  );
};
export default Footer;
