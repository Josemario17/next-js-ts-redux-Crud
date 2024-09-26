import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateModal, closeEditModal, resetFormData, updateFormData, updateTable } from '../Store/ModalSlice' 
import AddButton from './AddButton'
import { database } from '@/Services/Firebase'
import { RootState } from '../Store/store' 
import { toast } from 'react-toastify'
import LoaderModal from './LoaderModal'

interface FormData {
  key: string
  name: string
  email: string
  cargo: string
}

export default function Form({ SectionName }: { SectionName: string }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
  const [loading, setLoading] = useState<Boolean>(false)
  const dispatch = useDispatch() 


  const formData = useSelector((state: RootState) => state.modal.formData)
  const UserInStage = useSelector((state: RootState) => state.modal.UserInStage)

  useEffect(() => {
    if (formData) {
      setValue("name", formData.name)
      setValue("email", formData.email)
      setValue("cargo", formData.cargo)
    }
  }, [formData, setValue])

  
  const cadastrarUsuario = (ref: any, data: FormData ) => {
    setLoading(true)
    const newUserRef = ref.push(); 
    const idNew = newUserRef.key; 
    const dataWithKey = { ...data, key: idNew };
    return newUserRef.set(dataWithKey).then(() => {
    toast.success('Usuário Cadastrado');
    dispatch(closeCreateModal());
    setLoading(false);
    dispatch(updateTable())
  }).catch((error: Error) => {
    toast.error('Erro ao cadastrar usuário: ' + error.message);
    setLoading(false);
  });
  };
  
  const editarUsuario = async (ref: string, data: FormData) => {
    setLoading(true);
    database.ref("usuarios").child(ref).update(data).
    then(()=>{
        toast.success('Usuário Editado')
        dispatch(closeEditModal())
        setLoading(false)
        dispatch(updateTable())
      }).catch((error: Error) => {
        toast.error('Erro ao Editar usuário: ' + error.message);
        setLoading(false);
      });
  }
  

  const gravar = (data: FormData, formData: FormData | null) => {
    const ref = database.ref('usuarios');
  
    if (formData) {
      return editarUsuario(UserInStage, data);
    } else {
      return cadastrarUsuario(ref, data);
    }
  };
  
  const onSubmit = (data: FormData) => {  
    dispatch(updateFormData(data));
    gravar(data, formData) 
    dispatch(resetFormData());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nome
            </label>
            <input
              {...register("name", { required: "Nome é obrigatório", minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres" } })}
              type="text"
              id="name"
              className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
              placeholder="digite o nome"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "E-mail inválido" }
              })}
              type="email"
              id="email"
              className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
              placeholder="exemplo@exemplo"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Cargo
          </label>
          <input
            {...register("cargo", { required: "Cargo é obrigatório" })}
            type="text"
            id="cargo"
            className={`bg-gray-50 border ${errors.cargo ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
            placeholder="desenvolvedor"
          />
          {errors.cargo && <p className="text-red-500 text-sm mt-1">{errors.cargo.message}</p>}
        </div>
        {
            loading ? <LoaderModal></LoaderModal> : <AddButton text={`${SectionName} Usuario`} typeButton="Submit" handleClick={() => { }} />
        }
      </form>
    </>
  )
}
