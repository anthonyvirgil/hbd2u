import React, { useEffect, useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import styled from 'styled-components/macro';
import { useStorage } from '../hooks/useStorage';

const UploadImageForm = ({ setFileUrl }) => {
	const [file, setFile] = useState(null);
	const [editedFile, setEditedFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const imageTypes = ['image/png', 'image/jpeg'];
	const setEditorRef = useRef(null);

	const { url, progress } = useStorage(editedFile, file?.name);

	useEffect(() => {
		setErrorMessage('');
		if (url) {
			setFileUrl(url);
			setFile(null);
		}
	}, [editedFile, progress, file]);

	const uploadImage = (e) => {
		let selected = e.target.files[0];
		if (selected && imageTypes.includes(selected.type)) {
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
			{errorMessage && <Error>{errorMessage}</Error>}
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
			<ButtonContainer>
				<ImageSelectForm>
					<ImageFileLabel for="file">Select Image</ImageFileLabel>
					<FileInput id="file" type="file" onChange={uploadImage} />
				</ImageSelectForm>
				<CropAndSaveButton disabled={!file} type="text" onClick={saveCropped}>
					Crop & Save
				</CropAndSaveButton>
			</ButtonContainer>
		</>
	);
};

export default UploadImageForm;

const CropAndSaveButton = styled.button`
	display: block;
	position: relative;
	background-color: var(--hbd-color-3);
	margin: 0 20px 0 20px;
	padding: 15px 20px;
	border-radius: 25px;
	color: var(--hbd-font-color);
	font-size: 1.2em;
	outline-style: none;
	border-style: none;
	:hover {
		cursor: pointer;
	}
	:disabled {
		opacity: 0.5;
	}
`;

const Error = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	margin: 20px;
`;

const ImageSelectForm = styled.form``;
const ImageFileLabel = styled.label`
	font-weight: 400;
	display: block;
	position: relative;
	background-color: var(--hbd-color-3);
	margin: 0 20px 0 20px;
	padding: 15px 20px;
	border-radius: 25px;
	color: var(--hbd-font-color);
	font-size: 1.2em;
	outline-style: none;
	border-style: none;
	:hover {
		cursor: pointer;
	}
`;
const FileInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
`;
