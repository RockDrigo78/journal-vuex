import cloudinary from 'cloudinary';
import uploadImage from '@/modules/daybook/helpers/uploadImage.js';
import axios from 'axios';

cloudinary.config({
    cloud_name: 'dd469q8hl',
    api_key: '881176847969293',
    api_secret: '-f2-BE4iV7r0VbSRB6y0ZXtIb-Y',
});

describe('upload image helper tests', () => {
    test('should upload a file and return a url', async (done) => {
        const res = await axios.get(
            'https://res.cloudinary.com/dd469q8hl/image/upload/' +
                'v1641332443/samples/bike.jpg',
            {
                responseType: 'arraybuffer',
            }
        );

        const file = new File([res.data], 'foto.jpg');
        const url = await uploadImage(file);

        expect(typeof url).toBe('string');

        const urlSegments = url.split('/');
        const imageId = urlSegments[urlSegments.length - 1].replace('.jpg', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
    });
});
