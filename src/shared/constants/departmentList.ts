import { useState } from "react";

export function departmentList() {
  const departmentList = [
    {
      selected: false,
      value: "marketingAndSales",
      label: "Marketing e vendas",
    },
    {
      selected: false,
      value: "financial",
      label: "Financeiro",
    },
    {
      selected: false,
      value: "operations",
      label: "Operações",
    },
    {
      selected: false,
      value: "rh",
      label: "RH",
    },
    {
      selected: false,
      value: "eps",
      label: "EPS",
    },
    {
      selected: false,
      value: "ti",
      label: "TI",
    },
    {
      selected: false,
      value: "epdi",
      label: "EPDI",
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
      selected: isSelected("marketingAndSales"),
      value: "marketingAndSales",
      label: "Marketing e vendas",
    },
    {
      selected: isSelected("financial"),
      value: "financial",
      label: "Financeiro",
    },
    {
      selected: isSelected("operations"),
      value: "operations",
      label: "Operações",
    },
    {
      selected: isSelected("rh"),
      value: "rh",
      label: "RH",
    },
    {
      selected: isSelected("eps"),
      value: "eps",
      label: "EPS",
    },
    {
      selected: isSelected("ti"),
      value: "ti",
      label: "TI",
    },
    {
      selected: isSelected("epdi"),
      value: "epdi",
      label: "EPDI",
    },
  ];

  return departmentList;
}
