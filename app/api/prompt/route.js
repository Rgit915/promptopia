import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET request handler to fetch all prompts
export const GET = async (request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all prompts from the database and populate the 'creator' field
    const prompts = await Prompt.find({}).populate('creator');

    // Return a success response with the fetched prompts
    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    // Return an error response if fetching prompts fails
    return new Response("Failed to fetch all prompts", { status: 500 });

  }
};