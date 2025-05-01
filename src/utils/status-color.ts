const colorsList = {
  green: ['shipped', 'success', 'paid', 'delivered', 'upsell'],
  yellow: ['partiallyPaid', 'on_hold', 'PRODUCER', 'partially_paid'],
  blue: ['new', 'approved', 'DEALER'],
  red: ['canceled', 'due', 'delete', 'cancelled', 'Pickup Cancelled'],
  orange: ['returned'],
};

const BASE = 'text-sm font-medium';

const StatusColor = {
  GREEN:
    'bg-green-50/80 border-green-500 text-green-500 hover:bg-green-50/80' +
    BASE,
  YELLOW:
    'bg-yellow-50/80 border-yellow-500 text-yellow-500 hover:bg-yellow-50/80' +
    BASE,
  BLUE:
    'bg-blue-50/80 border-blue-500 text-blue-500 hover:bg-blue-50/80' + BASE,
  RED: 'bg-red-50/80 border-red-500 text-red-500 hover:bg-red-50/80' + BASE,
  ORANGE:
    'bg-orange-50/80 border-orange-500 text-orange-500 hover:bg-orange-50/80' +
    BASE,
  DEFAULT:
    'bg-gray-50/80 border-gray-500 text-black hover:bg-gray-50/80' + BASE, // Default color in case of no match
};

type StatusTypes = keyof typeof colorsList | string;

export const getStatusColor = (status: StatusTypes): string => {
  for (const [color, statuses] of Object.entries(colorsList)) {
    if (statuses.includes(status)) {
      return (
        StatusColor[color.toUpperCase() as keyof typeof StatusColor] ||
        StatusColor.DEFAULT
      );
    }
  }
  return StatusColor.DEFAULT;
};
