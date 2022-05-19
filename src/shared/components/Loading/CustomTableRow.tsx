import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import loading_lottie from "../../assets/animation/settings-loading.json";

interface Props {
  loading: boolean;
  typeTableRowText: "usuário" | "equipamento" | "chamado";

  colSpan: number
}

const CustomTableRow: React.FC<Props> = ({loading, typeTableRowText, colSpan}) => {
  const container = useRef<HTMLSpanElement>(null);

  useEffect(() => {    
    if (container.current) {      
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie,
      });
    }
  }, [loading]);

  return (
    <tr className={loading ? "table-row": ""}>
      <td colSpan={colSpan} className="no-results">
        {loading ? (
          <div className="loading_container">
            <span ref={container} className="loading_lottie"/>
          </div>
        ) : 
          `Não foi encontrado nenhum ${typeTableRowText}`
        }
      </td>
    </tr>
  );
};

export default CustomTableRow;
