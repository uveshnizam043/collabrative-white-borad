import { ref } from "vue";
import { state } from "./useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export function useGet(endpoint) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);
    let url = endpoint;

    // Only initialize AbortController once
    let controller = new AbortController();
    const signal = controller.signal;

    const get = async (endpoint) => {
        if (endpoint) {
            url = endpoint;
        }

        loading.value = true;
        data.value = null;
        error.value = null;

        try {
            const res = await fetch(`${API_URL}/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.token}`,  // Template literal for cleaner token handling
                    "ngrok-skip-browser-warning": "69420",   // If needed for bypassing the ngrok warning
                },
                signal,  // Reuse the signal from controller
            });

            const jsonRes = await res.json();

            if (!jsonRes.success) {
                error.value = jsonRes.message || 'Request failed.';
            } else {
                data.value = jsonRes.data;
            }

        } catch (err) {
            if (err.name === 'AbortError') {
                error.value = 'Request was aborted.';
            } else {
                error.value = err.message || 'An unexpected error occurred.';
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        get,
        controller,
    };
}


export function usePatch(endpoint) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const patch = async (body) => {
        loading.value = true;
        data.value = null;
        error.value = null;
        try {
            const res = await fetch(`${API_URL}/${endpoint}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + state.token,
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                error.value = await res.json();
            } else {
                data.value = await res.json();
            }
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        patch,
    };
}

export function usePut(endpoint) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const put = async (body) => {
        loading.value = true;
        data.value = null;
        error.value = null;
        try {
            const res = await fetch(`${API_URL}/${endpoint}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + state.token,
                    "Csrf-Token": "nocheck",
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                error.value = await res.json();
            } else {
                data.value = await res.json();
            }
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        put,
    };
}

export function usePost(endpoint) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const post = async (body) => {
        loading.value = true;
        data.value = null;
        error.value = null;
        try {
            const res = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + state.token,
                },
                body: JSON.stringify(body),
            });
            const jsonRes = await res.json();
            if (!jsonRes.success) {
                error.value = jsonRes.message || 'Request failed.';
            } else {
                data.value = jsonRes.data;
            }
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        post,
    };
}

export function useDelete(endpoint) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const remove = async (body) => {
        loading.value = true;
        data.value = null;
        error.value = null;
        try {
            const res = await fetch(`${API_URL}/${endpoint}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + state.token,
                    "Csrf-Token": "nocheck",
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                error.value = await res.json();
            } else {
                data.value = await res.json();
            }
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        remove,
    };
}
