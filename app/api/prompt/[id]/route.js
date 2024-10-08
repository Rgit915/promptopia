import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET request handler to fetch one specific prompt
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200
    });
  } catch (error) {

    return new Response("Failed to fetch a prompt", { status: 500 });

  }
};

//PATCH(update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    //Find the existing prompt by ID
    const existingPrompt = await prompt.findById(params.id);

    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    //Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {

  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status:200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status:500 });
  }
};