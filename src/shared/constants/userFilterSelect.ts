import { User } from '../interfaces/user.interface';

export function getOptionListSelectPerUserRole(role?: User['role']) {
  if (role === 'admin') {
    return [
      {
        value: 'allUsers',
        label: 'Todos os usuários',
        selected: true,
      },
      {
        value: 'admin',
        label: 'Administradores',
        selected: false,
      },
      {
        value: 'support',
        label: 'Suportes',
        selected: false,
      },
      {
        value: 'client',
        label: 'Comuns',
        selected: false,
      },
    ];
  } else if (role === 'support') {
    return [
      {
        selected: true,
        value: 'underAnalysis',
        label: 'Meus atendimentos',
      },
      {
        value: 'awaiting',
        label: 'Chamados abertos',
      },
      {
        value: 'done',
        label: 'Chamados fechados',
      },
    ];
  } else {
    return [
      {
        selected: true,
        value: '',
        label: 'Meus chamados',
      },
      {
        value: 'done',
        label: 'Todos os chamados concluídos',
      },
    ];
  }
}
