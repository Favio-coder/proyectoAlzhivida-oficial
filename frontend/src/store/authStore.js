import { create } from 'zustand'
import { persist } from 'zustand/middleware'

let logoutTimeout = null

const getTokenExpiration = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000; // Convertir a milisegundos
    } catch (e) {
        return null;
    }
};

const setupAutoLogout = (expiresAt, logoutFn) => {
    const msUntilLogout = expiresAt - Date.now();

    if (logoutTimeout) clearTimeout(logoutTimeout); // Limpia timeout anterior

    if (msUntilLogout > 0) {
        logoutTimeout = setTimeout(() => {
            logoutFn();
        }, msUntilLogout);
    }
};

export const useAuthStore = create(persist(
    (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        expiresAt: null,

        login: ({ token, usuarioRecuperado }) => {
            const expiresAt = getTokenExpiration(token);

            setupAutoLogout(expiresAt, () => get().logout());

            set({
                token,
                user: usuarioRecuperado,
                isAuthenticated: true,
                expiresAt,
            });
        },

        logout: () => {
            if (logoutTimeout) clearTimeout(logoutTimeout);
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                expiresAt: null,
            });
        },

        checkSession: () => {
            const { token, user, expiresAt } = get();
            if (token && user && expiresAt && Date.now() < expiresAt) {
                setupAutoLogout(expiresAt, () => get().logout());
                set({ isAuthenticated: true });
            } else {
                get().logout();
            }
        },
    }),
    {
        name: 'auth-storage',
        partialize: (state) => ({
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            expiresAt: state.expiresAt,
        }),
    }
));
