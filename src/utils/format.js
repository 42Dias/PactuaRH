/*
  Formata o tanto int quanto float para o real
*/
export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});
