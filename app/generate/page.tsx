'use client'

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"
import { api } from "../../convex/_generated/api";
import { Eraser, PenLine, Trash2} from "lucide-react"

import ArtDialog from "../../components/ArtDialog";





export default function Home() {
 const [artsIds, setArtsIds] = useState('')
 const [promptValue, setPromptValue] = useState('')
 const [isLoading, setIsLoading] = useState(false);
 const [isEraseMode, setIsEraseMode] = useState(true);
 const [showHeader, setShowHeader] = useState(false);

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


const headerStyle = {
  backgroundImage: "url('/header.png')"
}

  return (
    <main className="flex min-h-screen flex-col items-center  justify-between bg-cover bg-fixed" 
style={headerStyle}>
      <div className="container mx-auto flex flex-col flex-wrap items-center mt-10">
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(async (formData) => {
            setIsLoading(true);
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            const result = await saveArtMutation({ ...formData, image });
            //@ts-ignore
            setArtsIds(result.id)
            setIsLoading(false);
          })}
        >
          <Label className="mt-4 text2 text-3xl ">Doodle it !</Label>
            <ReactSketchCanvas
              svgStyle={{borderRadius: 7}}
              ref={canvasRef}
              width="40vh"
              height="40vh"
              style={{ borderRadius: 10 }}
              strokeWidth={4}
              strokeColor="black"
              className="w-1/2 shadow-lg cursor-cell"
              allowOnlyPointerType = 'all'
              // @ts-ignore
              eraser={isEraseMode}
              />
              <div className="flex gap-2 w-full justify-between">
               <Button type="button" variant={"outline"} onClick={()=> {
                  setIsEraseMode(!isEraseMode);
                  canvasRef?.current?.eraseMode(isEraseMode);
               }}>
        {isEraseMode ? (<Eraser className="w-8 h-8" />) : (<PenLine className="w-8 h-8" />)}
      </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
            className="text1 font-medium"
          >
            <Trash2 className="w-8 h-8"/>
          </Button>
              </div>
          <Label htmlFor="prompt" className="text2 text-3xl">Describe it</Label>
          <Input autoComplete="off" id="prompt" {...register("prompt", { required: true })} onChange={(e) => setPromptValue(e.target.value)} className="w-full text1 font-medium  flex-1" />
          {errors.prompt && <span>This field is required</span>}
        
          <Button type="submit" className="text2 font-bold text-3xl" onClick={() => setShowHeader(true)}>Submit it</Button>
        </form>
        {showHeader && (
        <ArtDialog isLoading={isLoading} promptValue={promptValue} artsQuery={artsQuery} />
        )}

       
</div>
    </main>
  )
}
