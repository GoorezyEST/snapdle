export async function retrieveCards() {
  const response = await fetch("http://localhost:3000/api/cards")
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Error: ${error}`);
    });

  return response;
}

/*MAIN: https://game-snapdle.vercel.app/*/
