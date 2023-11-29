'use node'

import { internal } from "./_generated/api";
import { v } from "convex/values";
import { internalAction} from "./_generated/server";
import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config({ path: `.env` })

export const generate = internalAction({
  args: {artsId: v.id("art"), prompt: v.string(), image: v.string()},
  handler: async (ctx, {artsId, prompt, image}) => {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        'Check REPLICATE_API_TOKEN env variable is set'
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
      
    });
    const output = (await replicate.run(
      "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      {
        input: {
          image,
          scale: 7,
          prompt,
          image_resolution: "512",
          ddim_steps: 20,
          a_prompt: "best quality, extremely detailed",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }
    )) as [string, string];

    await ctx.runMutation(internal.art.updatedArtRes,{
      artsId,
      result: output[1],
    })
  }
})