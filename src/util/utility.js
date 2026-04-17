const {
  VITE_API_URL,
  VITE_REDIRECT_URI_2,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_API_TOKEN,
} = import.meta.env;

export async function generateAccessToken(code) {
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", `${code}`);
  body.append("redirect_uri", `${VITE_REDIRECT_URI_2}`);
  const res = await fetch(`${VITE_API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET),
    },
    body: body,
    // body: `grant_type=authorization_code&code=${code}&redirect_uri=${VITE_REDIRECT_URI}`,
    // body: "grant_type=client_credentials",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export function generateRandomNumber() {
  return Date.now();
}

export function convertSecstoTime(expires_in) {
  const date = new Date();
  const addHour = expires_in * 1000;
  const newDate = new Date(date.getTime() + addHour);
  // date.setHours(date.getHours() + 1);
  return newDate;
  //   function formatSeconds(totalSeconds) {
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;

  //   // Use padStart to ensure two digits for minutes and seconds
  //   const hDisplay = hours.toString().padStart(2, '0');
  //   const mDisplay = minutes.toString().padStart(2, '0');
  //   const sDisplay = seconds.toString().padStart(2, '0');

  //   return `${hDisplay}:${mDisplay}:${sDisplay}`;
  // }
}
