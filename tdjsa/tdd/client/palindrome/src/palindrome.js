export default function (phrase) {
  if (phrase === undefined) {
    throw new Error('Argument missing');
  }
  phrase = String(phrase).trim();
  return Boolean(
    phrase.length &&
    phrase.split('').reverse().join('') === phrase
  );
};