/**
 * Shared status → solid chip colors for booking status chips.
 * Use consistently across all pages (list, details, etc.).
 */
export const STATUS_CHIP_STYLES = {
  Confirmed: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
  Pending: {
    backgroundColor: '#ff9800',
    color: '#ffffff',
  },
  Cancelled: {
    backgroundColor: '#f44336',
    color: '#ffffff',
  },
};

export const getStatusChipSx = (status) => ({
  ...STATUS_CHIP_STYLES[status],
  fontSize: '13px',
  fontWeight: 500,
  height: '32px',
});
