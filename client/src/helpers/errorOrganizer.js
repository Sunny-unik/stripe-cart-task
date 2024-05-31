export default function (error) {
  const response = error.response;
  if (!response) return alert("Internal server error!");
  const { error: innerError, message: baseErrorMessage } = response.data;
  const { code, message, errors, fields } = innerError || {};

  console.error({ message, code });
  const finalizeErrors = fields
    ? Object.keys(fields).map((key) => `This ${key} is already used`)
    : errors;
  if (finalizeErrors && finalizeErrors.length)
    return alert(finalizeErrors.join(",\n"));
  alert(message || baseErrorMessage || "Internal Server Error!");
}
