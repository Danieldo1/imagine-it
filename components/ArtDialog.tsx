import React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "./ui/button";
import {Loader2} from "lucide-react"
import Image from "next/image";



type ArtDialogProps = {
  isLoading: boolean;
  promptValue: string;
  artsQuery: any[] | undefined; 
};

const ArtDialog: React.FC<ArtDialogProps> = ({
  isLoading,
  promptValue,
  artsQuery,
}) => {
  return ( 
    <div className="mt-5">
        <span >


  </span>
      <Dialog>
        <DialogTrigger asChild>
          {!isLoading ? (

            <Button variant="outline" className="text2 relative  font-bold text-3xl">
             <span className="absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 animate-ping bg-red-500"></span>
              Show me
            </Button>
        
          ) : (
            <Button variant="outline">
              <Loader2 className="animate-spin  h-8 w-8" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader className="mt-2 text-center justify-center items-center">
            <DialogTitle>Here is your amazing art!</DialogTitle>
            <DialogDescription>{promptValue}</DialogDescription>
          </DialogHeader>
          {artsQuery && artsQuery.length > 0 && artsQuery[0].result && (
            <div className='w-full h-full'>
              <Image
              width={512}
              height={512}
           
                src={artsQuery[0].result}
                className="max-w-full h-auto' rounded-xl"
                alt="Art result"
              />
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {artsQuery! && (
                  <a href={artsQuery[0].result} download>
                    Download
                  </a>
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtDialog;