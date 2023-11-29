'use client'

import { useMutation } from "convex/react"
import { useForm, SubmitHandler } from "react-hook-form"



export default function Home() {
const saveSketch = useMutation("art:uploadArt") 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ prompt: string}>()

  return (
    <main className="flex min-h-screen flex-col bg-gray-500 items-center">
    <form onSubmit={handleSubmit(async (formData)=>{
      const result = await saveSketch(formData)

      console.log(result)
    })}>
      <input {...register("prompt", { required: true })} />
      {errors.prompt && <span>This field is required</span>}
      <input type="submit" />
    </form>
    </main>
  )
}
