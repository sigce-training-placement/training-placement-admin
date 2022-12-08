import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'

import React from 'react'
import { useState } from 'react';

const TextEditor = ({ label, value, setValue }) => {
	const modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			[{ 'script': 'sub' }, { 'script': 'super' }],
			[{ 'indent': '-1' }, { 'indent': '+1' }],
			[{ 'align': [] }],
		]
	}

	const formats = [
		'header',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 'indent',
		'link', 'image'
	]
	return (
		<div className="w-full h-96 pb-6 z-[4000] bg-white">
			<label className='mb-1 font-semibold cursor-pointer'>{label}: </label>
			<ReactQuill theme="snow" className='mt-2 Montserrat border-2 rounded-lg h-full text-base'
				onChange={setValue}
				modules={modules}
				value={value}
				formats={formats}>
			</ReactQuill>
		</div>
	)
}

export default TextEditor
