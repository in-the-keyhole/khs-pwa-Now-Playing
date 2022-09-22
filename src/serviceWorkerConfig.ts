import { toast } from "react-toastify";
import { UpdateRefreshToast } from "./components/Toast";

const serviceWorkerConfig = {
    onUpdate: (registration: ServiceWorkerRegistration) => {
        toast.dismiss('checking-for-update');
        toast.info(UpdateRefreshToast, {
            toastId: 'new-version',
            autoClose: false
        });
        // if (window.confirm("Do you want to update?")) {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        // window.location.reload();
        // }
    },
    onSuccess: (registration: ServiceWorkerRegistration) => {
        console.log("registration onSuccess callback...", registration);
    },
}

export default serviceWorkerConfig;