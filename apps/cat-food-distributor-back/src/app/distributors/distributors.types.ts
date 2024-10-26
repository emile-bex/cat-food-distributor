export const SocketEvents = {
  SERVE_FOOD: 'serve-food',
  FOOD_SERVED_CONFIRMATION: 'food-served-confirmation',
  IDENTIFICATION_SUCCESS: 'identification-success',
  IDENTIFICATION_ERROR: 'identification-error'
} as const;

export type SocketEvent = typeof SocketEvents[keyof typeof SocketEvents]
