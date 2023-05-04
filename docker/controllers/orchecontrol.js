import { v4 } from 'uuid';
import dockerode from 'dockerode';
import crypto from 'crypto';
export const createimageController = async (req, res) => {
    let id = req.body.id;
    let name = 'nilayj49/alpine-apps'
    let tag = 'latest'
    let docker = new dockerode();
    try {
        const stream = await docker.pull(`${name}:${tag}`);
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, output) => {
                if (err) reject(err);
                else resolve(output);
            });
        });
        const userId = v4();
        const password = crypto.randomBytes(8).toString('hex');
        const container = await docker.createContainer({
            Image: name,
            Env: [`USER_ID=${userId}`, `PASSWORD=${password}`],
            ExposedPorts: { '6080/tcp': {} },
            HostConfig: {
                PortBindings: { '6080/tcp': [{ HostPort: '0' }] },
            },
        });

        await container.start();

        const port = await docker.getContainer(container.id).inspect()
            .then((data) => data.NetworkSettings.Ports['6080/tcp'][0].HostPort);

        // Construct the URL
        const url = `http://${req.hostname}:${port}`;

        // Return the user ID, password, and URL as a response
        res.json({ userId, password, url });
    }
    catch (err) {
        console.log(err);
        return res.json("error")
    }
}