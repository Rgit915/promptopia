import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// POST request handler to create a new prompt
export const POST = async (req, res) => {
   // Extract userId, prompt, and tag from the request body
  const { userId, prompt, tag } = await req.json();

  try {
    // Connect to the database
    await connectToDB();

    // Create a new Prompt instance with the provided data
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    // Save the new prompt to the database
    await newPrompt.save();

    // Return a success response with the newly created prompt
    return new Response(JSON.stringify(newPrompt), {
      status: 201
    })
  } catch (error) {
    // Return an error response if the prompt creation fails
 return new Response("Failed to create a new prompt", { status: 500})
  }
};