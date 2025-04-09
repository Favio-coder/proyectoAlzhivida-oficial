import { useForm, FormProvider } from "react-hook-form";
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Input from '../components/Input';

function Login() {
    const methods = useForm()

    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <Input
                        label="Nombre"
                        type="text"
                        id="nombre"
                        placeholder="Escribe tu nombre"
                        name="nombre"
                        validation={{ required: "El nombre es obligatorio" }}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </FormProvider>
        </div>
    );
}

export default Login;
