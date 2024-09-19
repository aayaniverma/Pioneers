# Car Troubleshooting Chatbot

This project is a chatbot designed to assist with troubleshooting car-related problems. It consists of two main parts: the **frontend** and the **backend**. Follow the instructions below to set up, clone, and run the project.

## Project Structure

- **Frontend:** Located in the `frontend` folder. Built using Next.js.
- **Backend:** Located in the `DotNetConf` folder. Built with .NET.

---

## Cloning the Repository

To get started, clone the repository to your local machine.

1. Open your terminal.
2. Run the following command to clone the repository:
    ```bash
    git clone https://github.com/your-username/car-troubleshooting-chatbot.git
    ```

3. Navigate into the cloned repository:
    ```bash
    cd car-troubleshooting-chatbot
    ```

---

## Frontend Setup (Next.js)

### Dependencies
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/docs/install) (for managing packages)

### Steps to Run

#### Using npm:

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Install DaisyUI (for UI components):
    ```bash
    npm i -D daisyui@latest
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

#### Using yarn:

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    yarn install
    ```

3. Install DaisyUI:
    ```bash
    yarn add -D daisyui@latest
    ```

4. Start the development server:
    ```bash
    yarn dev
    ```

---

## Backend Setup (DotNetConf)

### Dependencies
Ensure you have the following installed:
- [C# extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- [.NET SDK](https://dotnet.microsoft.com/download)

### Steps to Run

1. Navigate to the `DotNetConf` folder:
    ```bash
    cd DotNetConf
    ```

2. Install all necessary dependencies:
    ```bash
    dotnet restore
    ```

3. Copy and paste the commands from the `script.rtf` file into your terminal:
    ```bash
    cat script.rtf | pbcopy  # Mac/Linux
    clip < script.rtf  # Windows
    ```

4. Start the backend server:
    ```bash
    dotnet watch run
    ```

---

## Troubleshooting

- **Frontend issues:** Make sure all dependencies are installed, and you are running the latest Node.js version.
- **Backend issues:** Verify that the .NET SDK is installed and properly configured.

Feel free to open an issue if you encounter any problems!
