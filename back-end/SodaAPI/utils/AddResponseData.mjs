const descriptions = {
  404: "not found",
  200: "good response",
  201: "created",
  400: "invalid values",
  204: "no content",
};

export default function AddResponseData(status, data, message) {
  return {
    message: message ?? "N/A",
    description: descriptions[status],
    status: status,
    data: data,
    timesec: Date.now(),
  };
}
