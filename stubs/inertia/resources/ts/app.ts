require("./bootstrap");

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import Layout from "@/Layouts/AppLayout.vue";


InertiaProgress.init({
    // The delay after which the progress bar will
    // appear during navigation, in milliseconds.
    delay: 250,
    // The color of the progress bar.
    color: "#DB2777",
    // Whether to include the default NProgress styles.
    includeCSS: true,
    // Whether the NProgress spinner will be shown.
    showSpinner: false,
});
const el: HTMLElement | null = document.getElementById("app");
import { Head, Link } from '@inertiajs/inertia-vue3'

createInertiaApp({
    resolve: (name: String) => require(`./Pages/${name}`),
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .mixin({ methods: { route } })
            .component("Layout", Layout)
            .component('InertiaHead', Head)
            .component('InertiaLink', Link)
            .mount(el);
    },
});
