// data/dialogues.ts
import type { DialogueTree } from "@/types/game";

export const dialogues: Record<string, DialogueTree> = {
  "mama-tosin": {
    start: "greet",
    nodes: {
      greet: {
        speaker: "Mama Tosin",
        text: "Ah, new face! You look hungry. Welcome to my buka.",
        choices: [
          { label: "What do you sell?", next: "menu" },
          { label: "Where am I?", next: "where" },
          { label: "Just passing by.", next: "bye" },
        ],
      },
      menu: {
        speaker: "Mama Tosin",
        text: "Jollof rice, fried plantain, moi moi, pepper soup. Everything hot, everything fresh.",
        choices: [
          { label: "Sounds good!", next: "hustle" },
          { label: "Let me ask something else.", next: "greet" },
        ],
      },
      hustle: {
        speaker: "Mama Tosin",
        text: "Come back soon. I will need somebody to run deliveries to the shops around the block.",
        next: null,
      },
      where: {
        speaker: "Mama Tosin",
        text: "This is the heart of the block. Danfo and keke dey pass all day, so don't stand in the road.",
        next: "greet",
      },
      bye: {
        speaker: "Mama Tosin",
        text: "Safe journey. Don't let the traffic catch you.",
        next: null,
      },
    },
  },

  "conductor-bayo": {
    start: "greet",
    nodes: {
      greet: {
        speaker: "Bayo",
        text: "Oya, oya! Yaba, Oshodi, Ikeja! Enter with your change o!",
        choices: [
          { label: "How much to Yaba?", next: "fare" },
          { label: "How do I make money here?", next: "money" },
          { label: "Not today.", next: "bye" },
        ],
      },
      fare: {
        speaker: "Bayo",
        text: "Two hundred naira. No change wahala, I beg.",
        next: "greet",
      },
      money: {
        speaker: "Bayo",
        text: "Hustle, my friend. Mama Tosin always needs hands. Go and talk to her.",
        next: "greet",
      },
      bye: {
        speaker: "Bayo",
        text: "No wahala. The bus no go wait for anybody!",
        next: null,
      },
    },
  },
};