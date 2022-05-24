export interface Pageable {
  empty: boolean;

  first: boolean;
  last: boolean;

  // Números da página atual
  number: number;
  numberOfElements: number;

  size: number;

  // Números de todas as páginas
  totalElements: number;
  totalPages: number;
}
