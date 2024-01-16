export async function retrieveCards() {
  const response = await fetch("https://snapdle-game.vercel.app/api/cards")
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Error: ${error}`);
    });

  return response;
}

/*MAIN: https://snapdle-game.vercel.app/*/
