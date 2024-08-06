import { app, BrowserWindow, shell, protocol } from "electron";
import { MainWin } from "../subsystem";
import { startHttp } from "../server";
import { isRunningInDevServer as isRunningUnderDevServer } from "../sysUtils";

["disable-renderer-backgrounding",
"disable-backgrounding-occluded-windows",
"ignore-certificate-errors"].forEach((i)=>app.commandLine.appendSwitch(i))

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
]);

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow | null = null;

app.whenReady().then(() => {
	app.on("window-all-closed", () => {
		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		app.quit();
	});
	createWindow();
});


async function createWindow() {
	win = MainWin.newWindow();
	win.setMenu(null);
	const gotTheLock = app.requestSingleInstanceLock();
	if (!gotTheLock) {
		app.quit();
	} else {
		app.on("second-instance", () => {
			// Someone tried to run a second instance, we should focus our window.
			if (win) {
				if (win.isMinimized()) win.restore();
				win.focus();
			}
		});
	}
	win.once("ready-to-show", () => {
		win.show();
	});
	win.on("close", () => {
		MainWin.closeAll();
	});

	win.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: "deny" };
	});
	/**
	 * 若于 DEV SERVER 中运行，则：
	 *   - HTTP 服务器j仅提供api、消息中转
	 *   - electron 浏览器载入 VITE DEV SERVER 所 serve 的 index.html。
	 * 否则：
	 * 	 - HTTP 服务器完整功能会发挥作用，除提供 ws 支持外也 serve
	 *     静态文件（包括 index.html）。
	 *   - electron 浏览器载入 HTTP SERVER 所 serve 的 index.html。
	 *
	 * 消息中转采用EventSource
	 */
	startHttp().then((res: any) => {
		if (isRunningUnderDevServer()) {
			win.loadURL(process.env.VITE_DEV_SERVER_URL);
			win.webContents.openDevTools();
			return;
		}
		win.loadURL(res.url);
	});

	MainWin.registerEvents(win);
}

if (process.platform === "win32") {
	process.on("message", (data) => {
		if (data === "graceful-exit") {
			app.quit();
		}
	});
}