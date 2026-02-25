/**
 * Shared status → solid chip colors for booking status chips.
 * Use consistently across all pages (list, details, etc.).
 */
export const STATUS_CHIP_STYLES = {
  Confirmed: {
    backgroundColor: '#66bb6a',
    color: '#fff',
  },
  Pending: {
    backgroundColor: '#fb8c00',
    color: '#ffffff',
  },
  Cancelled: {
    backgroundColor: '#e53935',
    color: '#fff',
  },
};

export const getStatusChipSx = (status) => ({
  ...STATUS_CHIP_STYLES[status],
  fontSize: status === 'Pending' ? '12px' : '13px',
  fontWeight: status === 'Cancelled' ? 600 : 500,
  height: status === 'Confirmed' ? '30px' : '32px',
  whiteSpace: 'nowrap',
  overflow: 'visible',
  borderRadius: status === 'Pending' ? '6px' : '16px',
  '& .MuiChip-label': {
    overflow: 'visible',
    whiteSpace: 'nowrap',
  },
});
