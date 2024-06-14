import { defineComponent } from "vue";
import {
	startLegacyApplet,
	legacyAppletList,
	openFolder,
	openFile,
} from "@front/util_function/system";
import path from "path";
export default defineComponent({
	data() {
		return {
			applets: [],
		};
	},
	mounted() {
		this.refreshList();
	},
	methods: {
		startApplet: startLegacyApplet,
		refreshList() {
<<<<<<< Updated upstream:src/views/legacyAppletsManager/mixin.ts
			legacyAppletList().then((res) => {
=======
			appletList().then((res) => {
>>>>>>> Stashed changes:src/views/applets/mixin.ts
				(this.applets as any) = res;
			});
		},
		openFolder() {
<<<<<<< Updated upstream:src/views/legacyAppletsManager/mixin.ts
			openFolder("./legacyApplets");
=======
			openFolder(`/.acfun-live-toolbox/app`, true);
>>>>>>> Stashed changes:src/views/applets/mixin.ts
		},
		openDocument() {
			openFile({
				url: path.join(
					process.resourcesPath,
					"../使用说明/小程序二次开发文档.md"
				),
			});
		},
	},
});
