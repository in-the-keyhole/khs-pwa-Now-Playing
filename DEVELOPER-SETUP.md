## Development Setup

This repository contains a [VSCode Remote Container](https://code.visualstudio.com/docs/remote/containers).  If you are not familiar with this configuration, you can check out this [tutorial](https://code.visualstudio.com/docs/remote/containers-tutorial).

> Note: Using the remote container configuration is completely optional, but recommended.

## Visual Studio Code - Remote Container Usage

If you choose not to use the Remote Container configuration, see the [Local Setup](#local-setup) prerequisites below.

> [Official Documentation](https://code.visualstudio.com/docs/remote/containers)

> _Note: Once you meet the prerequisites, you can run **ANY** Visual Studio Code Remote Container, which provides a Docker based development environment ensuring a consistent and reliable set of tooling needed to interact and execute a repository codebase_

### Prerequisites:

1. macOS, Windows, Linux -- [System Requirements](https://code.visualstudio.com/docs/remote/containers#_system-requirements)
2. Docker - [Documentation](https://code.visualstudio.com/docs/remote/containers#_installation)
3. Visual Studio Code - [Official Site](https://code.visualstudio.com/)
4. Remote - Containers _Visual Studio Code extension_ - [Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Environment Variables

The remote container honors the following environment variables set in the .devcontainer/.env

> _Note: You can copy the .devcontainer/.env.template file to .devcontainer/.env and supply the following variables_

##### AWS

The following environment variables are only required if you plan to deploy the application to AWS...running it locally will NOT require these variables.

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION - (optional - defaults to us-east-1)

> _Note: Changes to variables in .env after the container is running will require the Remote Container to be restarted_

#### Developer Configuration

To initialize the environment, once the repository is opened in the Remote Container, open a Terminal and type:

`yarn`

#### package.json Scripts

There are some predefined scripts in package.json that can be used to simplify common tasks.

- `yarn start` - runs the application locally 
- `yarn build` - builds the application for deployment into a `build` directory

## Local Setup

You will need the following installed/configured:

- Node (it was developed with version 16)
- yarn (you can use npm, but yarn was used to develop, thus the yarn.lock file)

