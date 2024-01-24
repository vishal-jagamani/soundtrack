import axios from 'axios';
import { config } from '../../config/config.js';

const demo = async (demo) => {
    try {
        1;
        console.log('Demo service', demo);
        const options = {
            url: `${config?.demoAPIURL}/fact`,
            method: 'GET',
        };
        const data = await axios(options);
        return { statusCode: 200, response: { status: true, data: data?.data } };
    } catch (err) {
        console.log('Error', err);
        throw { statusCode: 500, response: { status: false, message: 'Error in service' } };
    }
};

export { demo };
