import React from 'react';

const UserContext = React.createContext({
    user: {
        usuarioID: "",
        tipoUsuarioID: 1,
        nombre: "",
        nombreUsuario: "",
        fechaNacimiento: ""
    },
    setUser: () => { }
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;