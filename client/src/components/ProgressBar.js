import React, { useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile, setFileUrl }) => {
	const { url, progress } = useStorage(file);

	useEffect(() => {
		if (url) {
			setFile(null);
			setFileUrl(url);
		}
	}, [url, setFile]);

	return (
		<div>
			<p>{url}</p>
			<img src={url} />
		</div>
	);
};

export default ProgressBar;
