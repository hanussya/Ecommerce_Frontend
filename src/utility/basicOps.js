export default function basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize) {
  if (products == null) {
    return;
  }

  let filteredArr = products;

  if (searchTerm !== "") {
    filteredArr = filteredArr.filter((product) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const lowerTitle = (product.name || product.title || "").toLowerCase();
      return lowerTitle.includes(lowerSearchTerm);
    });
  }

  let filteredSortedArr = [...filteredArr];

  if (sortDir != 0) {
    if (sortDir == 1) {
      filteredSortedArr = filteredSortedArr.sort(incComparator);
    } else {
      filteredSortedArr = filteredSortedArr.sort(decComparator);
    }
  }

  let filteredSortedgroupByArr = filteredSortedArr;

  if (currCategory != "All categories") {
    filteredSortedgroupByArr = filteredSortedgroupByArr.filter((product) => {
      return product.categories == currCategory;
    });
  }

  let totalPages = Math.ceil(filteredSortedgroupByArr.length / pageSize);
  let sidx = (pageNum - 1) * pageSize;
  let eidx = sidx + pageSize;
  filteredSortedgroupByArr = filteredSortedgroupByArr.slice(sidx, eidx);

  return { filteredSortedgroupByArr, totalPages };
}

function incComparator(product1, product2) {
  return Number(product1.price) > Number(product2.price) ? 1 : -1;
}

function decComparator(product1, product2) {
  return Number(product1.price) < Number(product2.price) ? 1 : -1;
}