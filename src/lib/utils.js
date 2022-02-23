export const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
}).format(value);

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);