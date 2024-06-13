export function GET() {
	return Response.json(
		{
			healthcheck: true,
			message: "Hello from the other side...!",
		},
		{
			headers: { "Content-Type": "application/json" },
			status: 200,
		},
	);
}
