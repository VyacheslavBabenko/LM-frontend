type getRangeParams = {
  aroundItems: number;
  marginItems: number;
  currentPage: number;
  pageCount: number;
}

const getRange = ({currentPage, pageCount, aroundItems, marginItems }: getRangeParams): [number, number] => {
  const keyIndex = aroundItems + marginItems + 2;
  if (currentPage > pageCount - keyIndex) {
    const first = pageCount - keyIndex - aroundItems >= 0 ? pageCount - keyIndex - aroundItems : 0;
    return [first, pageCount]
  };

  if (currentPage >= keyIndex) {
    const first = currentPage - aroundItems >= 0 ? currentPage - aroundItems : 0;
    return [first, currentPage + aroundItems + 1];
  }

  return [0, keyIndex + aroundItems];
}

export { getRange };
