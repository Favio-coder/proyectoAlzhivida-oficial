import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {AnimatePresence , motion} from 'framer-motion'

function Input ({ label, type, id, placeholder, validation, name }) {
    
    const{
        register, 
        formState: {errors}
    } = useFormContext()

    //Funciones definidas
    const findInputError = (errors, name) => {
        if(!errors || !name) return null 
        return errors[name] ? { error: errors[name]} : null
    }

    const isFormInvalid = (inputError) => {
        return inputError !== null
    }

    //Declarar funciones 
    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)
    
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between">
            <label htmlFor={id} className="font-semibold capitalize">
                {label}
            </label>

            <AnimatePresence mode="wait" initial={false}>
                { isInvalid && (
                    <span className="text-red-500 text-sm">{inputError.error.message}</span>
                )}
            </AnimatePresence>
        </div>

        <input 
            id={id}
            type={type}
            className={`w-xs py-2 font-medium border rounded-md border-slate-300 border-solid border-b-4 placeholder:opacity-60`}
            placeholder={placeholder}
            {...register(name, validation)} 
            autoComplete="off"
        />
      </div>
    )
  }

export default Input