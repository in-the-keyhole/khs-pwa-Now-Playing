export function UpdateRefreshToast() {
    return (
        <>
            <span>A new version is available.</span><button className="toast-button" onClick={() => window.location.reload()}>REFRESH</button>
        </>
    );
}