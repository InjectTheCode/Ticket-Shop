exports.exclude = (dbObj, excludedFields) => {
  for (const field of excludedFields) {
    delete dbObj[field];
  }

  return dbObj;
};
