import React, { useEffect } from 'react';

const DocumentTitle = (title) => {
    useEffect(() => {
        document.title = title || 'MyWeb'; 
    }, [title]);
};


export default DocumentTitle;
