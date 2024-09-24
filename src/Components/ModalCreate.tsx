import AddButton from "./AddButton";

export default function ModalCreate({ ModalState } : { ModalState: any }) {
    return (
        <>
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bg-gray-700/50 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 mx-auto w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5 shadow-2xl border border-solid border-gray-600 ">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adicionar Usuario</h3>
                            <button onClick={()=> ModalState(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="digite o nome" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="exemplo@exemplo" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
                                <input type="text" name="cargo" id="cargo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="desenvolvedor" />
                            </div>
                            <AddButton text="Adicionar Usuario" typeButton="Submit" handleClick={()=>{}}></AddButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
