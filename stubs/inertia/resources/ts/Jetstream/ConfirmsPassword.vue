<template>
    <span>
        <span @click="startConfirmingPassword">
            <slot />
        </span>

        <jet-dialog-modal :show="confirmingPassword" @close="closeModal">
            <template #title>
                {{ title }}
            </template>

            <template #content>
                {{ content }}

                <div class="mt-4">
                    <jet-input
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                        ref="password"
                        v-model="form.password"
                        @keyup.enter="confirmPassword"
                    />

                    <jet-input-error :message="form.error" class="mt-2" />
                </div>
            </template>

            <template #footer>
                <jet-secondary-button @click="closeModal">
                    Cancel
                </jet-secondary-button>

                <jet-button
                    class="ml-2"
                    @click="confirmPassword"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ button }}
                </jet-button>
            </template>
        </jet-dialog-modal>
    </span>
</template>

<script lang="ts">
import JetButton from "./Button.vue";
import JetDialogModal from "./DialogModal.vue";
import JetInput from "./Input.vue";
import JetInputError from "./InputError.vue";
import JetSecondaryButton from "./SecondaryButton.vue";
import { nextTick, defineComponent, computed, ref } from "vue";
import axios from "axios";
export default defineComponent({
    emits: ["confirmed"],
    props: {
        title: {
            default: "Confirm Password",
        },
        content: {
            default:
                "For your security, please confirm your password to continue.",
        },
        button: {
            default: "Confirm",
        },
    },

    components: {
        JetButton,
        JetDialogModal,
        JetInput,
        JetInputError,
        JetSecondaryButton,
    },

    setup(props, { emit }) {
        let password = ref();
        let confirmingPassword = ref(false);
        let form = ref({
            password: "",
            error: "",
            processing: false,
        });

        const startConfirmingPassword = () => {
            // eslint-disable-next-line no-undef
            axios.get(route("password.confirmation")).then((response) => {
                if (response.data.confirmed) {
                    emit("confirmed");
                } else {
                    confirmingPassword.value = true;
                    setTimeout(() => password.value.$el.focus(), 250);
                }
            });
        };

        const confirmPassword = () => {
            form.value.processing = true;

            axios
                .post(route("password.confirm"), {
                    password: form.value.password,
                })
                .then(() => {
                    form.value.processing = false;
                    closeModal();
                    nextTick(() => emit("confirmed"));
                })
                .catch((error) => {
                    form.value.processing = false;
                    form.value.error = error.response.data.errors.password[0];
                    password.value.$el.focus();
                });
        };

        const closeModal = () => {
            confirmingPassword.value = false;
            form.value.password = "";
            form.value.error = "";
        };

        return {
            password,
            startConfirmingPassword,
            confirmPassword,
            closeModal,
        };
    },
});
</script>
