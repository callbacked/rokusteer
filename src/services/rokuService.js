const backendURL = process.env.REACT_APP_BACKEND_URL;
// console.log(backendURL);

export const sendCommand = async (rokuIp, command) => {
    try {
        const response = await fetch(`${backendURL}/send-command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rokuIp, command }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export const fetchChannels = async (rokuIp) => {
    try {
        const response = await fetch(`${backendURL}/query-apps?rokuIp=${rokuIp}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching channels:', error);
        return null;
    }
};

export const launchChannel = async (rokuIp, appId) => {
    try {
        const response = await fetch(`${backendURL}/launch-app`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rokuIp, appId }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error launching channel:', error);
    }
};

export const fetchIcon = async (rokuIp, appId) => {
    try {
        const response = await fetch(`${backendURL}/query-icon?rokuIp=${rokuIp}&appId=${appId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching icon:', error);
        return null;
    }
};
