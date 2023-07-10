export const fetcher = async <T>(
  url: URL | RequestInfo,
  options?: RequestInit
): Promise<T> => {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`/api/${url}`, requestOptions);
    const data: T = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  } catch (err) {
    throw err;
  }
};
