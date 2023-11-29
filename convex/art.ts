import { mutation, query } from "./_generated/server";

export const uploadArt = mutation(async ({db},{prompt}:{prompt:string})=>{
    console.log(prompt)
    await db.insert('art', { prompt })
    return {
        message: 'ok'
    }
})


export const getArt = query(async ({db})=>{
   const art = await db.query('art').collect()

   return art
})