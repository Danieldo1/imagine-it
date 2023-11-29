'use client'

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"
import { api } from "../convex/_generated/api";
import {Trash2} from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";






export default function Home() {
 const [artsIds, setArtsIds] = useState('')
 const [promptValue, setPromptValue] = useState('')
const saveArtMutation = useMutation(api.art.uploadArt) 
//@ts-ignore
const artsQuery = useQuery(api.art.getArts,{artsIds})
const canvasRef = useRef<ReactSketchCanvasRef>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ prompt: string}>()

  const filteredArts = (artsQuery ?? []).sort((x,y) => {
    return y._creationTime - x._creationTime
   })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-2 my-4 md:flex-row">
      <div className="container mx-auto flex flex-col flex-wrap items-center ">
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            const result = await saveArtMutation({ ...formData, image });
            //@ts-ignore
            setArtsIds(result.id)
          })}
        >
          <Label className="mt-4 text2 text-3xl ">Doodle it !</Label>
            <ReactSketchCanvas
              ref={canvasRef}
              width="40vh"
              height="40vh"
              // style={{ width:500, height: '100%', borderRadius: 10 }}
              strokeWidth={4}
              strokeColor="black"
              className="w-1/2"
              allowOnlyPointerType='all'
              />
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
            className="text1 font-medium"
          >
            <Trash2 />
          </Button>
          <Label htmlFor="prompt" className="text2 text-3xl">Describe it</Label>
          <Input autoComplete="off" id="prompt" {...register("prompt", { required: true })} onChange={(e) => setPromptValue(e.target.value)} className="w-full text1 font-medium  flex-1" />
          {errors.prompt && <span>This field is required</span>}
        
          <Button type="submit" className="text2 font-bold text-3xl">Submit it!</Button>
        </form>
   


        <div className="mt-5 ">
         
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show me</Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl ">
        <DialogHeader className="mt-2 text-center justify-center items-center">
          <DialogTitle>Here is your amazing art!</DialogTitle>
          <DialogDescription >
          {promptValue}
          </DialogDescription>
        </DialogHeader>
        {artsQuery && artsQuery.length > 0 && artsQuery[0].result && (
      <img src={artsQuery[0].result} className="max-w-full h-auto rounded-xl" alt="Art result" />
    )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </div>
</div>
    </main>
  )
}
