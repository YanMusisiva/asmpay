export async function GET() {
  return new Response(
    JSON.stringify({ message: "API temporaire active, design OK." }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ message: "API temporaire POST reçue." }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}