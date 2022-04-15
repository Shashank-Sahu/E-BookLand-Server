const ImageKit = require("imagekit");
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadNewImage = (req, res, next) => {
    const image = req.files.image;
    if (image.mimetype === 'image/jpeg' || image.mimetype === 'image/png') {
        imagekit.upload({
            file: Buffer.from(image.data).toString('base64'),
            fileName: image.name,
        },
            (err, response) => {
                if (err)
                    res.status(500).json(err);
                else {
                    req.body.image = {
                        imageId: response.fileId,
                        imageName: response.name,
                        imageUrl: response.url
                    };
                    next();
                }
            }
        );
    }
    else {
        res.status(415).json({ message: "file extension not valid" });
    }
};

const deleteImage = async (imageId) => { //is called explicitly by Book & Banner DELETE routes
    await imagekit.deleteFile(imageId);
};

module.exports = { uploadNewImage, deleteImage };