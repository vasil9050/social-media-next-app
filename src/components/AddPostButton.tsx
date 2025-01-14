import React from 'react'
import { useFormStatus } from 'react-dom'

function AddPostButton() {
    const { pending } = useFormStatus();
    return (
        <div>
            <button className='p-2 mt-2 rounded-md text-white bg-sky-500 disabled:bg-sky-200 disabled:cursor-not-allowed' disabled={pending}>
                {pending ?
                    (
                        <div className='flex items-center gap-2'>
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span
                                >
                            </div>
                            sending
                        </div>
                    )
                    : "Send"}
            </button>
        </div>
    )
}

export default AddPostButton
