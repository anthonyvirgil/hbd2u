import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';

// Custom Firebase hook
export const useStorage = (file, fileName) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (!file) return;
		const storageRef = projectStorage.ref().child(fileName);

		storageRef.put(file).on(
			'state_changed',
			(snap) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				setUrl(url);
			}
		);
	}, [file]);

	return { progress, url, error };
};
