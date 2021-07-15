<template>
    <div v-if="show" class="flex items-center justify-center text-center">
        <p
            v-if="!hasDefaultSlot"
            class="
                flex
                space-x-4
                items-center
                justify-center
                text-gray-300
                font-semibold
                py-2
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-8 w-8 mr-4"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            {{ $t("There is no data.") }}
        </p>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const hasDefaultSlot = computed(() => {
            return !!context.slots.default;
        });
        return {
            hasDefaultSlot,
        };
    },
});
</script>

<style></style>
