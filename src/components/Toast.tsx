import { toast } from "react-toastify";

export function UpdateRefreshToast() {
    return (
        <>
            <span>A new version is available.</span><button className="toast-button" onClick={() => window.location.reload()}>REFRESH</button>
        </>
    );
}

export function OfflineMessage() {
    return (
        <>
            <span>The application is offline, you can view this uncached content when it is back online.</span><button className="toast-button" onClick={() => toast.dismiss('offline')}>CLOSE</button>
        </>
    );
}