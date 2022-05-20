import React, { ChangeEvent, useEffect, useState } from "react";

import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import { Pageable } from "../../interfaces/pagable.interface";

import "../../styles/components/pagination.css"

interface Props {
  pageable?: Pageable,
  onChangePage: (pageNumber: number, pageSize: number) => Promise<void>,
}

const Pagination: React.FC<Props> = ({
  pageable,
  onChangePage
}) => {

  const [pageSize, setPageSize] = useState("20");

  function nextPage() {
    if (!pageable || pageable?.last) return;

    const pageNumber = pageable.number + 1
    onChangePage(pageNumber, Number(pageSize))
  }

  function prevPage() {
    if (!pageable || pageable?.first) return;

    const pageNumber = pageable.number - 1
    onChangePage(pageNumber, Number(pageSize))
  }

  function handlePageSize(event: any) {
    if (!pageable) return;  

    setPageSize(event.currentTarget.value);

    onChangePage(0, Number(event.currentTarget.value))
  }

  return (
    <>
      <div className="pagination-container">
        <div className="pagination-page-size">
          <span>Itens por página</span>
          <select name="page-size" id="page-size" defaultValue={pageable?.size} value={pageSize} onChange={(event: any) => handlePageSize(event)}>
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="100">100</option>
          </select>
        </div>

        <span>Página {pageable && pageable.number + 1} de {pageable?.totalPages ?? 1}</span>

        <div className="pagination-arrows">
          <FaChevronLeft 
            size="0.9rem" 
            className={pageable?.first ? "arrow-disabled": "arrow"} 
            title={pageable?.first ? "Desabilitado" : "Página anterior"}
            onClick={() => prevPage()}
          />
          <FaChevronRight 
            size="0.9rem" 
            className={pageable?.last ? "arrow-disabled": "arrow"} 
            title={pageable?.last ? "Desabilitado" : "Próxima Página"}
            onClick={() => nextPage()}
          />
        </div>
      </div>
    </>
  );
};

export default Pagination;
