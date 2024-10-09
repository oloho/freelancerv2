# Slave PC Control Panel

## Project Overview

This project is a comprehensive system for managing and controlling multiple PCs remotely. It consists of two main components:

1. A web-based control panel (frontend)
2. A Python-based client application for slave PCs (backend)

The system allows for remote task execution, including account creation and music streaming, as well as PC management functions like updates and reboots.

## Features

- Web-based dashboard for PC management
- Real-time status monitoring of connected PCs
- Remote task execution (e.g., creating accounts, streaming music)
- Automated software updates for connected PCs
- Logging system for all PC activities
- Remote reboot functionality
- Task queue management for each PC
- Database integration for storing created accounts

## Tech Stack

### Frontend
- React with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- Lucide React for icons
- Socket.IO client for real-time communication

### Backend (Slave PC Client)
- Python
- Socket.IO client
- Selenium WebDriver for browser automation
- PyAutoGUI for system-level automation

### Server
- Node.js with Express
- Socket.IO for real-time communication
- FaunaDB for database storage

### Deployment
- Netlify for frontend hosting and serverless functions

## Project Structure

```
project/
├── src/                    # Frontend source files
│   ├── components/         # React components
│   ├── services/           # API and service functions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main React component
│   └── main.tsx            # Entry point for the React app
├── slave_pc/               # Slave PC client application
│   ├── core/               # Core functionality for the slave PC
│   ├── services/           # Services for task execution and updates
│   ├── tasks/              # Task definitions and implementations
│   ├── utils/              # Utility functions for the slave PC
│   └── __main__.py         # Entry point for the slave PC application
├── netlify/
│   └── functions/          # Netlify serverless functions
├── public/                 # Public assets for the frontend
├── server.js               # Express server for development
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # NPM package configuration
├── requirements.txt        # Python dependencies for the slave PC
└── README.md               # This file
```

## Setup and Installation

### Frontend

1. Clone the repository:
   ```
   git clone https://github.com/your-username/slave-pc-control.git
   cd slave-pc-control
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Slave PC Client

1. Navigate to the `slave_pc` directory:
   ```
   cd slave_pc
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Configure the `config.py` file with the appropriate settings for your environment.

5. Run the slave PC client:
   ```
   python __main__.py
   ```

## Usage

### Web Control Panel

1. Access the web control panel by opening a browser and navigating to `http://localhost:3000` (or the appropriate URL if deployed).

2. Use the dashboard to monitor connected PCs, send tasks, and manage the system.

### Slave PC Client

The slave PC client runs as a background process on each controlled PC. It connects to the central server and awaits instructions.

## Deployment

### Frontend

The frontend is configured for deployment on Netlify. To deploy:

1. Push your changes to a GitHub repository.
2. Connect your GitHub repository to Netlify.
3. Configure the build settings in Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Slave PC Client

The slave PC client should be packaged and distributed to each PC you want to control. Ensure that Python and the required dependencies are installed on each slave PC.

## Security Considerations

- Implement proper authentication and authorization for the web control panel.
- Use secure communication protocols (HTTPS) for all network traffic.
- Regularly update all dependencies to patch security vulnerabilities.
- Implement rate limiting and other security measures to prevent abuse.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is for educational purposes only. Ensure you have proper authorization before using this software to control any computer systems.