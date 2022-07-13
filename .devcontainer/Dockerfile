# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.191.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version: bionic, focal
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:dev-14-bullseye

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y software-properties-common

# # Install needed OS tooling
# RUN add-apt-repository -y ppa:git-core/ppa && apt update \
#     && apt-get -y install --no-install-recommends \
#     git \
#     curl \
#     unzip \
#     bash-completion

# Install Terraform CLI
# https://learn.hashicorp.com/tutorials/terraform/install-cli
RUN apt-get install -y gnupg 
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
RUN apt-get update && sudo apt-get install terraform
RUN terraform -install-autocomplete

# Install AWS CLI
# https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN bash -c "echo 'complete -C '/usr/local/bin/aws_completer' aws' >> /root/.bashrc"

# Install iamlive
RUN wget -c "https://github.com/iann0036/iamlive/releases/download/v0.42.0/iamlive-v0.42.0-linux-386.tar.gz" -O - | tar -xz
RUN mv ./iamlive /usr/local/bin