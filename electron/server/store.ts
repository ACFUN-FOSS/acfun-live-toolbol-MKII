import File from "../subsystem/file";
import { configStatic } from "../subsystem/paths";
import path from "path";
export let cache: any = {};

export default () => {
	const url = path.join(configStatic, "cache.json");

	try {
		cache = JSON.parse(File.loadFile(url));
	} catch (error) {
		cache = {};
	}

	setInterval(() => {
		cache.updateTime = Date.now();
		File.saveFile(url, JSON.stringify(cache));
	}, 1000 * 60 * 5);
};
