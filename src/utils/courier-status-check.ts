export const checkCourierValidity = (
  status:
    | 'on_hold'
    | 'approved'
    | 'delivered'
    | 'cancelled'
    | 'returned'
    | 'pending',
  delivery_method: string,
): boolean => {
  const open = ['approved', 'delivered', 'cancelled', 'returned'];
  return open.includes(status) && delivery_method === 'in_house';
};

export const checkStatusEditable = (
  delivery_method: string | undefined,
): boolean => {
  return delivery_method === 'in_house';
};
