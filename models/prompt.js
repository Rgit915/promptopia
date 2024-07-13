import { Schema, model, models } from 'mongoose';

// Define the schema for the Prompt model
const PromptSchema = new Schema({
  // Reference to the User model for the creator field
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // The text of the prompt, which is required
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  // A tag for the prompt, which is also required
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

// Create the Prompt model if it doesn't already exist, otherwise retrieve the existing one
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;