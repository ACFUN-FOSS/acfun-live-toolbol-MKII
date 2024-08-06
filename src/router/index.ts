import {
	createRouter as vueRouterCreateRouter,
	createWebHistory,
	Router,
} from "vue-router";
import { isElectron } from "@front/util_function/electron";
import { electronRouting } from "@front/router/clientRouter";
// ATTENTION: Don't use:
// process
// global
// and any other node.js-specific global variables
// in non-electron environment.

//export default router;

// function foo(): Promise<Router> {
// 	console.log(1);
// 	return new Promise((resolve, reject) => {
// 		console.log(2);
// 		(import("@front/router/electronRouting").then(module =>
// 			console.log(module))
// 		).catch(err => console.error(err));
// 		console.log("e");
// 	})
// }

// export async function createRouter(): Promise<Router> {
// 	foo().then(() => {
// 		console.log("asdf")
// 	});
// 	return null;
// }

/**
 * 給路由器設置一咯過濾器，該過濾器負責主窗口在未登入時跳轉到登入頁面。
 *
 * 在開發模式下，不起作用。
 */
function setupRouterFilter(router: Router) {
	if (!isElectron() || process.env.NODE_ENV === "production") {
		console.log(2);
		router.beforeEach((to, from, next) => {
			if (!isElectron()) {
				if (to.meta.noElectron || to.name === "404") {
					next();
					return;
				}
				next({
					name: "404",
				});
			} else {
				// @ts-ignore
				if (to.meta.disabled && to.meta.disabled()) {
					next(false);
					return;
				}

				if (sessionStorage.getItem("logined") === "true") {
					if (to.name !== "Login") {
						next();
						return;
					}
					next({
						name: "dashboard",
					});
					return;
				}
				if (to.name === "Login") {
					next();
					return;
				}
				next({
					name: "Login",
				});
			}
		});
	}
}

// 可能是 rollup 的 bug 导致了如下问题：在 production 时候，入口文件以及其所 import
// 的 module 均不能出现 top-level await，否则 await 将永远等待
// （见 src/main.ts）
export async function createRouter(): Promise<Router> {
	const router = (() => {
		return vueRouterCreateRouter({
			history: createWebHistory(
				isElectron() ? process.env.BASE_URL : undefined
			),
			routes: electronRouting,
		});
	})();

	setupRouterFilter(router);

	return router;
}
