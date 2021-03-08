import React, { useEffect, useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useStorage } from '../hooks/useStorage';

const UploadImageForm = ({ setFileUrl }) => {
	const [file, setFile] = useState(null);
	const [editedFile, setEditedFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const imageTypes = ['image/png', 'image/jpeg'];
	const setEditorRef = useRef(null);

	const { url, progress } = useStorage(editedFile, file?.name);

	useEffect(() => {
		if (url) {
			setFileUrl(url);
			setFile(null);
		}
	}, [editedFile, progress]);

	const uploadImage = (e) => {
		let selected = e.target.files[0];
		if (selected) {
			setFile(selected);
		} else {
			setFile(null);
			setErrorMessage('Please select an image file (png or jpeg)');
		}
	};

	const saveCropped = () => {
		if (setEditorRef) {
			const canvas = setEditorRef.current.getImage().toBlob((blob) => {
				setEditedFile(blob);
			});
		}
	};

	return (
		<>
			<AvatarEditor
				ref={setEditorRef}
				image={file}
				width={250}
				height={250}
				border={50}
				color={[255, 255, 255, 0.6]} // RGBA
				scale={1.2}
				rotate={0}
				crossOrigin={'anonymous'}
			/>
			<button type="text" onClick={saveCropped}>
				Save
			</button>
			<form>
				<label>
					<input type="file" onChange={uploadImage} />
					<span>+</span>
				</label>
			</form>
		</>
	);
};

export default UploadImageForm;
