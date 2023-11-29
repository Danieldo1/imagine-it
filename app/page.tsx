'use client'

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"
import { api } from "../convex/_generated/api";



export default function Home() {
 const [artsIds, setArtsIds] = useState('')
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
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <div className="container mx-auto flex gap-4">
        <form
          className="flex flex-col gap-2 w-1/4"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            const result = await saveArtMutation({ ...formData, image });
            //@ts-ignore
            setArtsIds(result.id)

          })}
        >
          <Label htmlFor="prompt">Prompt</Label>
          <Input autoComplete="off" id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}

          <Label className="mt-4">Canvas (Draw something below)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width:512, height: 512 }}
            strokeWidth={4}
            strokeColor="black"
          />
{artsQuery && artsQuery.length > 0 && artsQuery[0].result && <img src={artsQuery[0].result} />}
          

          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
          >
            Clear
          </Button>

          <Button type="submit">Submit</Button>
        </form>

        <section >
          {/* <div className="grid grid-cols-4 gap-4">
          <h2 className="">Recent Sketches</h2>
            {filteredArts.map((art) => (
              <img
                key={art._id}
                width="256"
                height="256"
                src={art.result}
              />
            ))}
          </div> */}
        </section>
      </div>
    </main>
  )
}
