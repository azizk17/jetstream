<template>
    <div>
        <vue-json-pretty :path="'res'" :data="data"> </vue-json-pretty>
    </div>
</template>

<script lang="ts">
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { defineComponent } from "vue";

export default defineComponent({
    props: ["data"],
    components: {
        VueJsonPretty,
    },
});
</script>
