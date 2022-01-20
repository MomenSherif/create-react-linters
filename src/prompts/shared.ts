import c from 'ansi-colors';

export const primaryColor = c.yellow;

export const onCancel = (_: any) => {
  console.log(primaryColor('Wish we could help 😢'));
  return true;
};

export const prefix = { pending: '🚀', submitted: '√', cancelled: '×' };
export const styles = {
  primary: primaryColor,
};
