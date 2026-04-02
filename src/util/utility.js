const { VITE_API_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_API_TOKEN } =
  import.meta.env;

export async function generateAccessToken() {
  const res = await fetch(`${VITE_API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  console.log(data);
  return data.access_token;
}

export function generateRandomNumber() {
  return Date.now();
}
