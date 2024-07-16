const clients = {};

const eventsHandler = (req, res) => {
	const headers = {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	};
	res.writeHead(200, headers);

	const { isElectron, name } = req.query;

	clients[name] = res;

	res.on("close", () => {
		console.log(`${name} Connection closed`);
		delete clients[name];
	});
};

export const register = eventsHandler;

export const emit = (req, res) => {
	const { source, target, event, data } = req.body;
	if (!clients[target]) {
		res.code(404);
		res.send(`Client ${target} no found.`);
		return;
	}
	clients[target].write(
		JSON.stringify({
			source,
			event,
			data,
		})
	);

	res.code(200);
	res.send(`${event} emit successful from ${source} to ${target} `);
};
