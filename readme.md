# Setup Requirements

- Node js 16+ installed on the system. Use `node -v` command to check in the terminal.
- Install docker desktop on your system. https://www.docker.com/products/docker-desktop/
- You might need to Use Linux kernal update package if you are on windows, if prompted. Follow the article to install - https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
- Direct download link for the Linux kernal package - https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

# Run the project using docker

Follow the given steps to run the backend and frontend using docker.

- Create a new folder named `netweb-mvp`
- Clone both frontend and backend repos inside it.
- Links to repos -
  - https://github.com/himanshu064/netweb-mvp-frontend
  - https://github.com/himanshu064/netweb-mvp-backend
- You can use `ssh` or `https`. If you have not setup the `github ssh` in your system, ask for token to clone using `https`.
- **Note** - You dont have to do npm install to install the dependencies, the following steps will do that automatically for you.
- You will have two folders named `netweb-mvp-backend` and `netweb-mvp-frontend` inside `netweb-mvp` folder.
- Copy the `docker-compose.yml` file from `netweb-mvp-frontend` folder and then copy in the root folder named `netweb-mvp` (You already created at Step 1)
- Now Open the docker desktop and execute the following commands one by one in the root directory named `netweb-mvp`

  - `docker-compose down`
  - `docker system prune -a`
  - `docker-compose build --no-cache`
  - `docker-compose up`

- Frontend will run on http://localhost:3000
- Backend will run on http://localhost:2000

- Open the browser to check the same
- Steps are also noted live on - https://lemon-mist-0e6.notion.site/Netweb-MVP-Setup-575a4be8da5c41a38a63047b097b4325
