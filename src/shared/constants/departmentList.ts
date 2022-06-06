import { useState } from 'react';

export function departmentList() {
  const departmentList = [
    {
      selected: false,
      value: '',
      label: 'Selecione uma opção',
    },
    {
      selected: false,
      value: 'marketingAndSales',
      label: 'marketing e vendas',
    },
    {
      selected: false,
      value: 'finance',
      label: 'financeiro',
    },
    {
      selected: false,
      value: 'operations',
      label: 'operações',
    },
    {
      selected: false,
      value: 'rh',
      label: 'RH',
    },
    {
      selected: false,
      value: 'eps',
      label: 'EPS',
    },
    {
      selected: false,
      value: 'ti',
      label: 'TI',
    },
    {
      selected: false,
      value: 'epdi',
      label: 'EPDI',
    },
  ];

  return departmentList;
}

export function departmentListVariable(selectedDepartment: string) {
  function isSelected(value: string) {
    return value === selectedDepartment ? true : false;
  }

  const departmentList = [
    {
      selected: isSelected(''),
      value: '',
      label: 'Selecione uma opção',
    },

    {
      selected: isSelected('marketingAndSales'),
      value: 'marketingAndSales',
      label: 'marketing e vendas',
    },
    {
      selected: isSelected('finance'),
      value: 'finance',
      label: 'financeiro',
    },
    {
      selected: isSelected('operations'),
      value: 'operations',
      label: 'operações',
    },
    {
      selected: isSelected('rh'),
      value: 'rh',
      label: 'RH',
    },
    {
      selected: isSelected('eps'),
      value: 'eps',
      label: 'EPS',
    },
    {
      selected: isSelected('ti'),
      value: 'ti',
      label: 'TI',
    },
    {
      selected: isSelected('epdi'),
      value: 'epdi',
      label: 'EPDI',
    },
  ];

  return departmentList;
}
