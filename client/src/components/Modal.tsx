import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function Modal() {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    function hendlerPostText (e: React.ChangeEvent<HTMLInputElement>) {
        setText((pre: string) => ({...pre, [e.target.name]:e.target.value}))
    }
    async function hendlerNewPost (values: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        values.preventDefault()
        console.log("try")
        try {
            console.log(" in try")
            const responce = await fetch('http://localhost:3000/notebook', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(text),
                  credentials: "include",
                });
                const data = await responce.json();
                console.log(data);
                if(data.msg){
                    // dispatch({type: 'NOTEBOOK_TITLE', payload: {login: data.login}})
                    setOpen(false)
                } 

        } catch (error) {
            console.log("login error", error);
        }
    }
    
  return (
    <>
    <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => setOpen(true)}
      >
          создать новый блокнот
      </button>
    <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                                  Новый пост
                                              </Dialog.Title>
                                              <div className="mt-2">
                                                  <form className="space-y-6">
                                                      <div>
                                                          <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                                                              Напиши чо нибудь
                                                          </label>
                                                          <div className="mt-2">
                                                              <input
                                                                  id="login"
                                                                  name="text"
                                                                  type="login"
                                                                  autoComplete="login"
                                                                  required
                                                                  onChange={hendlerPostText}
                                                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                          </div>
                                                      </div>
                                                  </form>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                          type="button"
                                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                          onClick={hendlerNewPost}
                                      >
                                          пост
                                      </button>
                                      <button
                                          type="button"
                                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                          onClick={() => setOpen(false)}
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