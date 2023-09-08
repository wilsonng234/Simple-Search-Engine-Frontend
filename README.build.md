# Simple Search Engine UI

## Hosting the server

Creates a production build and serves it on port 3000.

1. `npm ci` to install the dependencies
2. `npm run build` to create a production build
3. `npm install -g serve` to install serve
4. `serve -s build` to serve the build folder

## Port Forwarding

Port Forwarding is required to access the server from outside the local network.

1. Find `IPv4 Address` and `Default Gateway` by running `ipconfig` in the command line
2. Enter the `Default Gateway` in the browser to open router interface
3. Find the port forwarding settings in the router interface
4. Add a new port forwarding rules with the following settings:
    - `Port from`: 3000
    - `Port to`: 3000
    - `IP Address`: `IPv4 Address` from step 1
    - `Protocol`: TCP, UDP
5. Add a new port forwarding rules with the following settings:
    - `Port from`: 8080
    - `Port to`: 8080
    - `IP Address`: `IPv4 Address` from step 1
    - `Protocol`: TCP, UDP
