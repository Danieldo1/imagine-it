
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadArt = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const art = await ctx.db.insert("art", {
      prompt,
    });

    await ctx.scheduler.runAfter(0, internal.generate.generate, {
      artsId: art,
      prompt,
      image,
    });

    return art;
  },
});

export const updatedArtRes = internalMutation({
  args: { artsId: v.id("art"), result: v.string() },
  handler: async (ctx, { artsId, result }) => {
    await ctx.db.patch(artsId, {
      result,
    })
  }
})

export const getArt = query({
  args: {artsId: v.id("art") },
  handler: (ctx, {artsId}) => {
    if(!artsId) {
      return null
    }
    return ctx.db.get(artsId)
  }
})

export const getArts = query({
  handler: async (ctx) => {
    const arts = await ctx.db.query("art").collect();
    return arts
  }
})