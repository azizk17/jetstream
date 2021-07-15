<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="
            rounded
            border-gray-300
            text-indigo-600
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
        "
    />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
    emits: ["update:checked"],

    props: {
        checked: {
            type: [Array, Boolean],
            default: false,
        },
        value: {
            default: null,
        },
    },
    setup(props, { emit }) {
        const proxyChecked = computed({
            get: () => props.checked,
            set: (val) => emit("update:checked", val),
        });

        return {
            proxyChecked,
        };
    },
    computed: {},
});
</script>
