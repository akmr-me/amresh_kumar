# LinkedIn AI Reply

This is a Chrome extension that runs on LinkedIn and assists users in generating replies to messages.

## Demo Video


https://github.com/user-attachments/assets/97f5ae5f-769b-4b3b-9d0b-0bf2a0336228


## Features

- Hide/Unhide AI button on focus/blur.
- Open a modal with the click of AI button, which will take a prompt and generate AI response.
- On click of the insert button put the response on LinkedIn message box.

## Technologies Used

- TypeScript
- ReactJS
- Tailwind CSS
- WXT framework for extension

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A code editor of your choice

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/akmr-me/amresh_kumar.git
   ```

2. Navigate to project directory:

   ```bash
   cd amresh_kumar
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   ```bash
   WXT_TARGET_ELEMENT_CLASS_NAME=msg-form__contenteditable
   WXT_ALLOWED_URL=*://*.linkedin.com/*
   WXT_SHADOW_ELEMENT_NAME=linkedin-chatgpt-writer
   WXT_APP_NAME=linkedin-ai-reply
   ```

5. Start:

   ```bash
   npm run dev
   ```

## Installation on chrome(browser)

1. Start:

   ```bash
   npm run build
   ```

2. Go to chrome extension's page chrome://extensions/

3. Click on load unpack

4. Locate you project directory's .output/chorme-mv3 folder and select it
