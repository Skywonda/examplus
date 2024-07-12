const api_url = process.env.REACT_APP_API_URL;

export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${api_url}/upload`, {
    method: "POST",
    body: formData,
  });
  const { upload } = await res.json();
  return Promise.resolve({ data: { link: upload.url } });
};
