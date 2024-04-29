export async function fetchShortestPath(startState, endState) {
  const response = await fetch(
    'http://localhost:5000/calculate_shortest_path',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: startState,
        end: endState,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to make post request');
  }

  const resData = await response.json();
  return resData;
}
