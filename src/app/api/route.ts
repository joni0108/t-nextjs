export function GET() {
	return Response.json({
		healthcheck: true,
		message: "Hello from the other side...!",
	});
}
