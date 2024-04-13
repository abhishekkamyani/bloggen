import React, { useState, useEffect } from 'react';

const ImageLoader = ({ src, alt, className }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageSrc(src);
        img.src = src;
    }, [src]);

    if (!imageSrc) {
        return (
            <h5
                className={`${className} mb-2 animate-pulse text-xl font-medium text-neutral-900 dark:text-white`}>
                <span className="inline-block h-full w-full flex-auto cursor-wait bg-current align-middle opacity-50"></span>
            </h5>
        ); // Your loading placeholder
    }

    return <img src={imageSrc} alt={alt} className={className} />;
};


export default ImageLoader;