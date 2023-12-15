import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function OneNote(id: number) {

    const [restart, setRestart] = useState(false)

    const [newTodo, setNewTodo] = useState('')

    const dispatch = useDispatch()

    const allTodos = useSelector((state) => state.TodosReducer.todos);

    const [openOneNote, setOpenOneNote] = useState(false)

    const cancelButtonRef = useRef(null)

    function hendlerInputTodo(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTodo((pre: string) => ({ ...pre, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        void (async function fetchData() {
            try {
                const responce = await fetch('http://localhost:3000/oneNote', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(id),
                    credentials: "include",
                });
                const data = await responce.json()
                dispatch({ type: 'ALLTODOS', payload: data })
            } catch (error) {
                console.log("todo error", error);
            }
        })();
    }, [restart, openOneNote]);

    async function createTodo(values: any) {
        values.preventDefault()
        try {
            const responce = await fetch('http://localhost:3000/oneNote/newTodo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "newTodo": `${newTodo.todo}`, id }),
                credentials: "include",
            });
            
            const data = await responce.json()
            console.log(data);
            setRestart(true)
            setNewTodo({'todo': ''})
        } catch (error) {
            console.log("newTodo error", error);
        }
    }

    
    
  return (
            <>
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
                    onClick={() => setOpenOneNote(true)}
                >
                    смотреть тудушки
                </button>
                <Transition.Root show={openOneNote} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenOneNote}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                        Все тудушки
                                                    </Dialog.Title>
                                                    <div>
                                                        <label
                                                            htmlFor="login"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Напиши свои никому не нужные дела
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="login"
                                                                name="todo"
                                                                type="text"
                                                                autoComplete="login"
                                                                required
                                                                value={newTodo.todo}
                                                                onChange={hendlerInputTodo}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={createTodo}
                                                            type="submit"
                                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Дроп
                                                        </button>
                                                    </div>
                                                    {allTodos &&
                                                        <div className="mt-2">
                                                            {allTodos.map((el) =>
                                                                <div key={el.id}>{el.text}</div>
                                                            )}
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpenOneNote(false)}
                                                ref={cancelButtonRef}
                                            >
                                                выйти
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root></>
        );
    }