export async function GET() {
  try {
    const response = await fetch(
      `https://marvelsnapzone.com/getinfo/?searchtype=cards&searchcardstype=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      return data;
    });

    return new Response(JSON.stringify(response));
  } catch {
    return new Response("Not valid request");
  }
}
