const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  require('dotenv').config();

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  async function waitForFilesActive(files) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".")
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name)
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready\n");
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini("Experiment.pdf", "application/pdf"),
    ];
  
    // Some files have a processing delay. Wait for them to be ready.
    await waitForFilesActive(files);
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
            {text: "summarize it"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here's a summary of the provided text, focusing on the experiment's objectives, theory, code, and output:\n\n**Experiment Overview:**\n\nThe experiment aims to detect and enhance edges in images using Sobel, Prewitt, and Laplacian filters.  The experiment is coded in Python using Google Colab, and leverages libraries such as NumPy, OpenCV, Matplotlib, and scikit-image.\n\n**Theoretical Background:**\n\n*   **Sobel Operator:** A first-order derivative operator approximating the image gradient. It detects intensity changes in both horizontal (Gx) and vertical (Gy) directions, emphasizing edges.\n*   **Prewitt Operator:** Similar to Sobel but uses a simpler averaging method, also a first-order derivative.\n*   **Laplacian Operator:** A second-order derivative operator detecting edges by finding regions of rapid intensity change. It measures intensity changes in all directions.  Because it's sensitive to noise, a Gaussian filter is often applied beforehand (Laplacian of Gaussian or LoG).\n\n**Code Implementation:**\n\nThe provided Python code:\n\n1.  Reads an image in grayscale.\n2.  Applies a Gaussian blur to reduce noise.\n3.  Applies Laplacian, Sobel and Prewitt filters\n4.  Applies the Canny edge detector\n5.  Displays the original image and the filtered outputs in a 2x2 subplot arrangement.\n\n**Output:**\n\nThe experiment produces images showing the results of applying the different filters to the original image.  The Laplacian, Sobel, and Prewitt outputs highlight edges based on their respective algorithms. The last picture applies the Canny filter.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("what is dog");
    console.log(result.response.text());
  }
  
  run();

  // gemini ADDED