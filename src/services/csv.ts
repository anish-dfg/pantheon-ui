/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertObjArrayToTsv = (data: any[], fields: string[]): string => {
  let csv = "";
  const header = fields.join("\t") + "\r\n";
  csv += header;
  data.forEach((obj: any) => {
    const row =
      fields
        .map((field) =>
          Array.isArray(obj[field]) || obj[field] instanceof Object
            ? JSON.stringify(obj[field])
            : obj[field],
        )
        .join("\t") + "\r\n";
    csv += row;
  });
  return csv;
};
