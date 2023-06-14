type conditionType = {
  $or?: { [field: string]: { $regex: string; $options: string } }[];
  $and?: { [field: string]: string }[];
}[];

interface returnType {
  $and?: conditionType;
}

export const getSearchAndFiltersCondition = (
  options: { [Type: string]: string },
  searchableFields: string[]
): returnType => {
  const { search, ...filters } = options;
  const conditions = [];
  if (search) {
    conditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filters).length) {
    conditions.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  return conditions.length > 0 ? { $and: conditions } : {};
};
