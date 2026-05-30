const API_KEY = 'YOUR_API_KEY_HERE'; // Do not hardcode your key here, it will be leaked to GitHub!

async function test() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: { 
            text: `You are Vithusan Vijayakumar.`
          }
        },
        contents: [
          { role: 'user', parts: [{ text: 'Hello' }] }
        ]
      })
    }
  );
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
