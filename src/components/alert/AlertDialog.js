import { h, createApp } from "vue";
import AlertDialog from "./AlertDialog.vue";

export default ({
    title,
    message,
    confirmText,
    cancelText,
    showClose,
    onCancel,
    onConfirm
}) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const dialog = createApp({
        render() {
            return h(AlertDialog, {
                title,
                message,
                confirmText,
                cancelText,
                showClose,
                onCancel: () => {
                    onCancel();
                    dialog.unmount();
                    container.remove();
                },
                onConfirm: () => {
                    onConfirm();
                    dialog.unmount();
                    container.remove();
                }
            });
        }
    });

    dialog.mount(container);
}