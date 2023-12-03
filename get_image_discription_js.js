import { spawn } from 'child_process';

function get_image_discription_js(imageLink) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['get_image_discription.py', imageLink]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result.trim());
            } else {
                reject(`Process exited with code ${code}`);
            }
        });
    });
}

export default get_image_discription_js;
