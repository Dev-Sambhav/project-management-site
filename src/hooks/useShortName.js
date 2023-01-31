export default function useShortName() {
  const shortTheName = (longName) => {
    const names = longName.split(" ");
    const shortName = names[0];
    return shortName;
  };
  return { shortTheName };
}
