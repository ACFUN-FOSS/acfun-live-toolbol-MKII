import store from "@front/store";
import { restart } from "@front/util_function/login";
import { RouteRecordRaw } from "vue-router";
const main = () => import("@front/layouts/main/index.vue");

export const electronRouting: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@front/views/login/index.vue"),
	},
	{
		path: "/",
		name: "home",
		component: main,
		meta: {
			label: "直播",
		},
		redirect: "/home/dashboard",
		children: [
			{
				path: "/dashboard",
				name: "dashboard",
				meta: {
					label: "首页",
					icon: "Monitor",
					action: "router",
				},
				component: () => import("@front/views/dashboard/index.vue"),
			},
			{
				path: "/roomMgmt",
				name: "roomMgmt",
				meta: {
					label: "房间管理",
					icon: "House",
					action: "router",
				},
				component: () => import("@front/views/roomMgmt/index.vue"),
			},
			{
				path: "/nameList",
				name: "roomNameList",
				component: () => import("@front/views/roomNameList/index.vue"),
				meta: {
					label: "小本本",
					icon: "Tickets",
					action: "router",
					disabled: () => {
						return false;
					},
				},
			},
		],
	},
	{
		path: "/plugIn",
		name: "plugIn",
		component: main,
		meta: {
			label: "插件",
		},
		children: [],
	},
	{
		path: "/config",
		name: "config",
		component: main,
		meta: {
			label: "设置",
		},
		children: [
			{
				path: "/config/general",
				name: "general",
				component: () => import("@front/views/general/index.vue"),
				meta: {
					label: "通用",
					icon: "Setting",
					action: "router",
					// disabled: () => {
					// 	return true;
					// }
				},
				// redirect: "/"
			},
			{
				path: "/config/market",
				name: "market",
				component: () => import("@front/views/general/index.vue"),
				meta: {
					label: "插件市场",
					icon: "Setting",
					action: "router",
					// disabled: () => {
					// 	return true;
					// }
				},
				// redirect: "/"
			},
		],
	},
];

export async function getClientRouter(): Promise<RouteRecordRaw[]> {
	return electronRouting;
}
