export default function (error) {
  const response = error.response;
  if (!response) return alert("Internal server error!");
  const {
    error: { code, message, errors, fields },
    message: baseErrorMessage,
  } = response.data;
  console.error({ message, code });
  const finalizeErrors = fields
    ? Object.keys(fields).map((key) => `This ${key} is already used`)
    : errors;
  if (finalizeErrors && finalizeErrors.length)
    return alert(finalizeErrors.join(",\n"));
  alert(message || baseErrorMessage || "Internal Server Error!");
}
