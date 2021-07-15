<template>
    <inertia-link v-if="href" :href="href" :class="classes">
        <slot></slot>
        <svg
            v-if="arrow"
            class="h-5 w-5 fill-current ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
            />
        </svg>
    </inertia-link>
    <div v-if="!href">
        <slot> </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        href: {
            type: Object,
        },
        active: {
            type: Boolean,
            default: false,
        },
        arrow: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const classes = computed(() => {
            return props.active
                ? "inline-flex items-center px-1 pt-1  font-medium  text-gray-900 focus:outline-none  transition duration-150 ease-in-out"
                : "inline-flex items-center px-1 pt-1  font-medium  text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700  transition duration-150 ease-in-out";
        });
        return {
            classes,
        };
    },
});
</script>
