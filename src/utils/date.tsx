type DateTimeFormat = 'DD MMMM YYYY';

const DATE_FORMAT_DEFAULT = 'DD MMMM YYYY';

export const formatDate = (
  dateString: string | number | Date,
  format: DateTimeFormat = DATE_FORMAT_DEFAULT,
): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  try {
    if(format === 'DD MMMM YYYY') {
      const formatDateOptions: Record<string, string | boolean> = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      };
      const dataString = date.toLocaleString('en-US', formatDateOptions);
      return dataString
    }
  } catch (error) {
    console.error(error)
  }

  return '';
};
