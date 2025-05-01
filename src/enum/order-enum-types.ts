enum PaymentStatus {
  PAID = 'paid',
  DUE = 'due',
  PARTIALLY_PAID = 'partially_paid',
  REFUND = 'refund',
}

enum OrderStatus {
  PENDING = 'pending',
  ON_HOLD = 'on_hold',
  APPROVED = 'approved',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
}

export { PaymentStatus, OrderStatus };
