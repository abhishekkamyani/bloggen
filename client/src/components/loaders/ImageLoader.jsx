import { useState, useEffect } from 'react';

const ImageLoader = ({ src, alt, className, loaderClassName }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;

        //the onload function will be called when the image is ready to be loaded
        img.onload = () => {
            setImageSrc(src);
        }
    }, [src]);

    // Our loading placeholder
    if (!imageSrc) {
        return (
            <h5
                className={`${className} animate-pulse text-xl font-medium text-neutral-900 dark:text-white`}>
                <span className={`${loaderClassName} inline-block h-full w-full flex-auto cursor-wait bg-current align-middle opacity-50`}></span>
            </h5>
        );
    }

    return <img src={imageSrc} alt={alt} className={className} />;
};


export default ImageLoader;